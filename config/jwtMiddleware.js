const jwtMiddleware = async (req, res, next) => {
  // 쿠키 내부에 저장된 토큰을 가져온다.

  let token = req.cookies.x_auth;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.json({ isAuth: false, message: "token decode 실패" });

    // 토큰을 복호화한 후 유저를 찾는다. (token 생성시 _id값을 주었음)
    const user = await User.findById({ _id: decoded.UserId }, (err) => {
      if (err)
        return res.json({
          isAuth: false,
          message:
            "백단 token 복호화에는 성공했으나 해당 User를 찾는데 실패했습니다. 로그아웃하셨군요",
        });
    });

    // 다음 컨트롤러에서 req를 빼다 쓰기 위해 저장
    req.token = token;
    req.user = user;
    next();
  });
};