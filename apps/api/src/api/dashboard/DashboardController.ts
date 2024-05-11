import { Request, Response, NextFunction } from 'express';
import { IReqAccessToken } from './../../helpers/Token/TokenType';
import { getUserinfoService } from './DashboardService';

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const { userInfo, userVoucher } = await getUserinfoService({ uid });
    console.log(userVoucher);

    res.status(201).send({
      error: false,
      message: 'Get user info',
      data: {
        name: userInfo?.name,
        email: userInfo?.email,
        username: userInfo?.username,
        userStatus: userInfo?.userStatus,
        referralCode: userInfo?.referralCode.referallCode,
        point: userInfo?.point.point,
        pointExpire: userInfo?.point.expireAt,
        voucher: userVoucher,
      },
    });
  } catch (error) {
    next(error);
  }
};
