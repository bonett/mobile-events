const helpers = {

    validateEmail: function (value) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        (!reg.test(value)) ? false : true;
    },
    helper2: function (param1) {

    },
    helper3: function (param1, param2) {

    }
}

export default helpers;