const getData = async ()=>{

    // Запрашиваю данные с "сервера"
    const data = await fetch("db.json");

    //если все норм то возвращаю данные в json-строке
    if(data.ok){
        return data.json();
    } else{
        throw new Error(`Данные не были полученны ${data.status} ${data.statusText}`);
    }
    
};

export default getData;