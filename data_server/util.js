let util = {}
let weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
util.getFood = function(arr, date){
    let returnObj = {}
    let data = new Date(date)
    let i = 0;
    for(i = 0; i < 7; i++){
        returnObj[weekEngShortName[i]] = arr[i]
    }
    return returnObj[weekEngShortName[new Date(date).getDay()]]
}

util.successFalse = function(err, message){
    if(!err && !message) message = 'data is not found!'
    return {
        success : false,
        message : message,
        errors : err,
        data : null
    }

}

        /* 서울 */ //SEOUL("sen.go.kr"),
        /* 인천 */ //INCHEON("ice.go.kr"),
        /* 부산 */ //BUSAN("pen.go.kr"),
        /* 광주 */ //GWANGJU("gen.go.kr"),
        /* 대전 */ //DAEJEON("dje.go.kr"),
        /* 대구 */ //DAEGU("dge.go.kr"),
        /* 세종 */ //SEJONG("sje.go.kr"),
        /* 울산 */ //ULSAN("use.go.kr"),
        /* 경기 */ //GYEONGGI("goe.go.kr"),

        /* 강원 */ //KANGWON("kwe.go.kr"),
        /* 충북 */ //CHUNGBUK("cbe.go.kr"),
        /* 충남 */ //CHUNGNAM("cne.go.kr"),
        /* 경북 */ //GYEONGBUK("gbe.go.kr"),
        /* 경남 */ //GYEONGNAM("gne.go.kr"),
        /* 전북 */ //JEONBUK("jbe.go.kr"),
        /* 전남 */ //JEONNAM("jne.go.kr"),
        /* 제주 */ //JEJU("jje.go.kr")
util.getUrl = function(urls){
    let url = urls
    if(url.includes("인천")) return "ice.go.kr"
    else if(url.includes("부산")) return "pen.go.kr"
    else if(url.includes("광주")) return "gen.go.kr"
    else if(url.includes("대전")) return "dje.go.kr"
    else if(url.includes("대구")) return "dge.go.kr"
    else if(url.includes("세종")) return "sje.go.kr"
    else if(url.includes("울산")) return "use.go.kr"
    else if(url.includes("경기도")) return "goe.go.kr"
    else if(url.includes("강원도")) return "kwe.go.kr"
    else if(url.includes("충북") || url.includes("충청북도")) return "cbe.go.kr"
    else if(url.includes("충남") || url.includes("충청남도")) return "cne.go.kr"
    else if(url.includes("경북") || url.includes("경상북도")) return "gbe.kr"
    else if(url.includes("경남") || url.includes("경상남도")) return "gne.go.kr"
    else if(url.includes("전북") || url.includes("전라북도")) return "jbe.go.kr"
    else if(url.includes("전남") || url.includes("전라남도")) return "jne.go.kr"
    else if(url.includes("제주")) return "jje.go.kr"
    else return "sen.go.kr"
}
util.getNum = function(data){
    if(data === 'high') return 4
    else if(data === 'middle') return 3
    else if(data === 'elementary') return 2
    else return 1
}
util.getToday = function(){
    Date.prototype.format = function (f) {

        if (!this.valueOf()) return " ";
    
    
    
        var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    
        var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    
        var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
        var d = this;
    
    
    
        return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
    
            switch ($1) {
    
                case "yyyy": return d.getFullYear(); // 년 (4자리)
    
                case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
    
                case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
    
                case "dd": return d.getDate().zf(2); // 일 (2자리)
    
                case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
    
                case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
    
                case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
    
                case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
    
                case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
    
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
    
                case "mm": return d.getMinutes().zf(2); // 분 (2자리)
    
                case "ss": return d.getSeconds().zf(2); // 초 (2자리)
    
                case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
    
                default: return $1;
    
            }
    
        });
    
    };
    
    
    
    String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
    
    String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
    
    Number.prototype.zf = function (len) { return this.toString().zf(len); };
    return new Date().format("yyyy.MM.dd")
}
util.successTrue = function(data){
    return{
        success : true,
        message : 'success',
        errors : null,
        data : data
    }
}
module.exports = util