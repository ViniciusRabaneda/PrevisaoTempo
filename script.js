document.querySelector('.busca').addEventListener('submit',async(event)=>{
    event.preventDefault(); // evita que o formulário seja enviado e as informações permaneçam na tela
    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo(); 
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`; // 1384392591697283fe753454ddb35cc2
        let results = await fetch(url); // espera o resultado da API
        let json = await results.json(); // pega o resultado e transforma em objeto
        
        if(json.cod === 200){
            showInfo({
                name:json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windoAngle: json.wind.deg

            });
        }else{
            clearInfo();
            showWarning('Não foi possível encontrar este local...');
        }
    }else{
        clearInfo();
    }   
});

function showWarning(msg){ // para mostra mensagem de que um evento esta ocorrendo
    document.querySelector('.aviso').innerHTML = msg;
}

function showInfo(json){
    showWarning('');
    document.querySelector('.resultado').style.display ='block';
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform =`rotate(${json.windAngle - 90}deg)`;
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}