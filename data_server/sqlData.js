let express = require('express')
let router = express.Router()
let testsql = require('mysql')
let util = require('./util')
let axios = require('axios')
let cheerio = require('cheerio')
let connection = testsql.createConnection({
    host: 'localhost',
    user: 'school_viewer',
    port: 3306,
    password: 'school_viewers',
    database: 'school_info'
})

connection.connect()

let findSchoolInfo = function(schName){
    return new Promise(function(resolve, reject){
        let searchName = "%" + schName + "%"
        connection.query('select * from school_data where name like ? limit 10', [searchName], function(err, rows){
            if(err || rows.length == 0){
                reject(util.successFalse(err, searchName))
            }else{
                resolve(util.successTrue(rows))
            }
        })
    })
}
let findSchoolInfoReal = function(schName, address){
    return new Promise(function(resolve, reject){
        let searchName =  schName 
        connection.query('select * from school_data where name=? AND address=?', [searchName,address], function(err, rows){
            if(err || rows.length == 0){
                reject(util.successFalse(err, searchName))
            }else{
                resolve(util.successTrue(rows))
            }
        })
    })
}
let findFood = function(schName, when, idx, address){
    return new Promise(function(res, rej){
        findSchoolInfoReal(schName, address).then(function(data){
            let schData = data.data[0]
            let schCode = schData.code
            let schNum = util.getNum(schData.type2)
            let url = (schData.address).substring(0, (schData.address).indexOf(" "))
            axios.get("https://stu."+ util.getUrl(url) + "/sts_sci_md01_001.do?schulCode="+schCode +"&schulKndScCode="+
            schNum+"&schulCrseScCode="+schNum+"&schYmd="+
            when+"&schMmealScCode=" + idx).then(html=>{
                let list = [];
                const $ = cheerio.load(html.data)
                const $bodyList = $("div.sts_con").children('div.sub_con')
                .children('table.tbl_type3').children('tbody').children('tr').children('td.textC')
                $bodyList.find('br').replaceWith('\n')
                $bodyList.each(function(i, obj){
                    if(i < 7) return true;
                    if(i > 14) return false;
                    list[i - 7] = $(this).text().split('\n')
                })
                res(util.getFood(list, when))
            })
        }).catch(function(err){
            rej(err)
        })
    })
    
}
router.get('/search', function(req, res, next){
    let searchName = "%" + req.query.name + "%"
    connection.query('select * from school_data where name like ? limit 10', [searchName], function(err, rows){
        if(err || rows.length == 0){
            res.send(util.successFalse(err, searchName))
        }else{
            res.send(util.successTrue(rows))
        }
    })
})

router.get('/result', function(req, res, next){
    let obj = new Object();
    findFood(req.query.name, req.query.when, 1, req.query.address)
    .then(function(data){
        obj['breakfast'] = data

        return(findFood(req.query.name, req.query.when, 2, req.query.address))
    }).then(function(data){
        obj['lunch'] = data

        return(findFood(req.query.name, req.query.when, 3, req.query.address))
    }).then(function(data){
        obj['dinner'] = data

        res.json(obj)
    }).catch(function(err){
        obj[0] = err
    })
})

router.get('/bab', function(req, res, next){
    let id = req.query.schCode
    let isHigh = req.query.schType
    let type = req.query.type
    let url = (req.query.where).substring(0, (req.query.where).indexOf(" "))
    axios.get("https://stu."+ util.getUrl(url) + "/sts_sci_md01_001.do?schulCode="+id +"&schulKndScCode="+
    isHigh+"&schulCrseScCode="+isHigh+"&schYmd="+
    util.getToday()+"&schMmealScCode=" + type).then(html=>{
        let list = [];
        const $ = cheerio.load(html.data)
        const $bodyList = $("div.sts_con").children('div.sub_con')
        .children('table.tbl_type3').children('tbody').children('tr').children('td.textC')
        $bodyList.find('br').replaceWith('\n')
        $bodyList.each(function(i, obj){
            if(i < 7) return true;
            if(i > 14) return false;
            list[i - 7] = $(this).text().split('\n')
        })

        res.json(util.getFood(list))

    })
    
})
router.get('/test', function(req, res, next){
    res.send("Hello world!" + req.query.name)
})
module.exports = router

