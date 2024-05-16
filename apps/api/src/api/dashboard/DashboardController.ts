import { Request, Response, NextFunction } from 'express';
import { IReqAccessToken } from './../../helpers/Token/TokenType';
import {
  getUserinfoService,
  getEventByIdService,
  getTicketByEventIdService,
  getEventSalesService,
  getEventSalesByYearService,
  getEventSalesByMonthService,
  getEventSalesByMonthAndYearService,
} from './DashboardService';

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;

    const { userInfo, userVoucher, userTransaction } = await getUserinfoService(
      { uid },
    );

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
        userTransaction: userTransaction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { id } = req.params;
    const idToNumber = Number(id);
    // console.log(typeof idToNumber);

    const getEventByIdResult = await getEventByIdService({
      id: idToNumber,
    });

    const getTicketByEventIdResult = await getTicketByEventIdService({
      id: idToNumber,
    });

    // console.log(getEventByIdResult);
    // console.log(getTicketByEventIdResult);

    res.status(201).send({
      error: false,
      message: 'Get Event info and ticket',
      data: {
        eventInfo: getEventByIdResult,
        Ticketinfo: getTicketByEventIdResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getEventSales = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqToken = req as IReqAccessToken;
    const { uid } = reqToken.payload;
    const { event, month, year } = req.query;
    // console.log(year);
    // console.log(month);

    const monthToNumber = Number(month);
    const eventIdToNumber = Number(event);
    const yearToNumber = Number(year);

    if (!month && !year) {
      console.log(1);
      const { findEventTransaction, findEventbyId } =
        await getEventSalesService({
          uid,
          eventId: eventIdToNumber,
        });

      return res.status(201).send({
        error: false,
        message: 'Get Transaction',
        data: {
          eventInfo: findEventbyId,
          eventTransaction: findEventTransaction,
        },
      });
    } else if (!year) {
      console.log(2);
      let getCurrentDate = new Date();
      let currentDateToISOString = getCurrentDate.toISOString();
      let currentYear = currentDateToISOString.split('-', 1).toString();

      const firstDate = `${currentYear}-0${monthToNumber}-01`;
      const lastDate = `${currentYear}-0${monthToNumber + 1}-01`;

      const { findEventTransaction, findEventbyId, filteredData } =
        await getEventSalesByMonthService({
          eventId: eventIdToNumber,
          firstDate,
          lastDate,
        });

      return res.status(201).send({
        error: false,
        message: 'Get Transaction',
        data: {
          eventInfo: findEventbyId,
          eventTransaction: filteredData,
        },
      });
    } else if (!month) {
      console.log(3);
      const firstYear = `${yearToNumber}-01-01`;
      const lastYear = `${yearToNumber + 1}-01-01`;

      const { findEventTransaction, findEventbyId, filteredData } =
        await getEventSalesByYearService({
          eventId: eventIdToNumber,
          firstYear,
          lastYear,
        });

      return res.status(201).send({
        error: false,
        message: 'Get Transaction',
        data: {
          eventInfo: findEventbyId,
          eventTransaction: filteredData,
        },
      });
    } else if (month && year) {
      console.log(4);
      const firstYearAndDate = `${yearToNumber}-0${monthToNumber}-01`;
      const lastYearAndDate = `${yearToNumber}-0${monthToNumber + 1}-01`;

      const { findEventTransaction, findEventbyId, filteredData } =
        await getEventSalesByMonthService({
          eventId: eventIdToNumber,
          firstDate: firstYearAndDate,
          lastDate: lastYearAndDate,
        });
      return res.status(201).send({
        error: false,
        message: 'Get Transaction',
        data: {
          eventInfo: findEventbyId,
          eventTransaction: filteredData,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
