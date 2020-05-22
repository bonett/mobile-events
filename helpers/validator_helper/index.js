const validatorHelper = {

    validateEmailFormat: function (value) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return (!reg.test(value)) ? false : true;
    }
}

export default validatorHelper;