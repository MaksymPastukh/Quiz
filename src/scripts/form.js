(function () {
  const Form = {
    agreeElement: null,
    processElement: null,
    fields: [
      {
        name: 'name',
        id: 'name',
        element: null,
        regex: /^[А-Я][а-я]+\s*$/,
        valid: false,
      },
      {
        name: 'lastName',
        id: 'last-name',
        element: null,
        regex: /^[А-Я][а-я]+\s*$/,
        valid: false,
      },
      {
        name: 'email',
        id: 'email',
        element: null,
        regex: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        valid: false,
      },
    ],

    init() {
      // Когда срабатывает функция init в переменную that мы размещаем this (ссылку на все обьект Form) - через эту переменную мы уже в любом месте внутри можем обращаться к this даже если контекст у нас потерян и все благодаря замыканию

      const that = this;

      // Проходимся циклом по массиву обьектов и размещаем в свойство element нужный элемент который найдем на странице и после это у меня будет возможность использования свойства fields как угодно

      this.fields.forEach(item => {
        item.element = document.getElementById(item.id);
        // После того как находим и запиваем элемент, мы еще и вешаем на него обработчик события по изменению значения
        item.element.onchange = function () {
          that.validateField.call(that, item, this);
        };
      });

      // Находим кнопку отправки формы
      this.processElement = document.getElementById('process');
      this.processElement.onclick = function () {
        that.processForm();
      };

      // Находим чекбокс
      this.agreeElement = document.getElementById('agree');
      // Вешаем обработчик по изменению значения
      this.agreeElement.onchange = function () {
        that.validateForm();
      };
    },

    validateField(field, element) {
      if (!element.value || !element.value.match(field.regex)) {
        element.parentNode.style.borderColor = 'red';
        field.valid = false;
      } else {
        element.parentNode.removeAttribute('style');
        field.valid = true;
      }
      // Вызываем функцию для проверки валидности полей
      this.validateForm();
    },

    // В данной функции будем делать валидацию на всю форму для того что бы понять можем ли мы дать пользователю нажать на кнопку

    // Проверить на то что все поля валидны
    validateForm() {
      const validForm = this.fields.every(el => el.valid);
      const isValid = this.agreeElement.checked && validForm;
      if (isValid) {
        this.processElement.removeAttribute('disabled');
      } else {
        this.processElement.setAttribute('disabled', 'disabled');
      }

      return isValid;
    },
    processForm() {
      if (this.validateForm()) {
        let paramString = '';
        this.fields.forEach(item => {
          paramString +=
            (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
        });
        location.href = 'choice.html' + paramString;
      }
    },
  };

  Form.init();
})();
