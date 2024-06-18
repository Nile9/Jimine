
const forms =() => {
    const form = document.querySelectorAll('form'),
        input=document.querySelectorAll('input')

    const message ={
        loading: 'Загрузка...',
        success: 'Спасибо, Данные дошли!',
        failure: 'Что-то пошло не так....'
    }

    form.forEach(item =>{
        item.addEventListener('submit', (e) =>{
            e.preventDefault();

            let statusMessage = document.createElement('div')
        });
    });
};

export default forms;