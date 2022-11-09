import jwt from 'jsonwebtoken';

function myProduct(req, res, next) {
    const painterToken = req.headers['authorization']?.split(' ')[1];
    const painterEmail = req.body.painterEmail;

    if (!painterToken || painterToken ==='null') {
        console.log('서비스 사용 요청이 있습니다. 하지만, Authorization 토큰: 없음');
        res.status(401).json({
            status: 401,
            result: 'forbidden-approach',
            reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
        });
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
        const jwtDecoded = jwt.verify(painterToken, secretKey);

        const email = jwtDecoded.email;

        if ( email !== painterEmail) {
            console.log("서비스 사용 요청이 있습니다.하지만, 본인 토큰이 아님.");

        res.status(403).json({
            result: "forbidden-approach",
            reason: "본인만 접근할 수 있습니다..",
        });
        return;
        }
        next();
    } catch (error) {
        next(error);
    }
}

export { myProduct };