exports.TryError = (error, res) => {
    console.log(error);
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "에러 발생!"
                }
            ]
        }
    )
}

exports.CommonError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "에러 발생!"
                }
            ]
        }
    )
}

exports.NotLongPasswordError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "비밀번호의 길이가 9자리 이상이어야 합니다."
                }
            ]
        }
    )
}

exports.NotSamePasswordError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "비밀번호가 동일하지 않습니다."
                }
            ]
        }
    )
}

exports.AlreadyUserExistsError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "유저가 존재하지 않습니다."
                }
            ]
        }
    )
}

exports.FailToBcryptPassword = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "비밀번호 암호화가 실패했습니다."
                }
            ]
        }
    )
}

exports.FailToSendEmailError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "이메일 보내기 실패했습니다."
                }
            ]
        }
    )
}

exports.UserNotExistsError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "해당하는 유저가 존재하지 않습니다."
                }
            ]
        }
    )
}

exports.NotVerifiedEmailError = (res) => {
    return res.status(400).send(
        {
            errors: [
                {
                    msg: "확인되지 않은 이메일 입니다."
                }
            ]
        }
    )
}