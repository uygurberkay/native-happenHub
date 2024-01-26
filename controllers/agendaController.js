import { StatusCodes } from "http-status-codes";
import agendaModel from '../models/agendaModel.js';

/* Controllers */

/* CREATE EVENT */

export const createEvent = async (req, res) => {
    try {
        const {
            title,
            startDate,
            endDate,
            categories,
            colaboratives,
            description,
            color,
            status,
        } = req.body;

        // Validation
        if(!title || !startDate || !endDate || !categories || !colaboratives || !description || color === null ) {
            return (
                res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Fill all requirements'
            })
            )
        }

      // Assuming "categories" is an array of strings
        const event = await agendaModel({
            title,
            startDate,
            endDate,
            categories,
            colaboratives,
            description,
            color,
            status,
        });
        await event.save();

        res.status(StatusCodes.CREATED).json(event);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: 'Internal Server Error' ,
            error,
        });
    }
};

/* GETS ALL EVENTS BY ID */

export const getAllEventById = async (req,res) => {
    try {
        const userId  = req.params.userId;
        console.log(userId)

        const userEvents = await agendaModel.find({
            $or: [
                { colaboratives: userId},
            ],
            })

        res.status(StatusCodes.OK).json(userEvents);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: 'Internal Server Error' ,
            error,
        });
    }
}


/* GETS ALL EVENTS BY ID AND MATCHING DATE*/

export const getAllEventByIdAndDate = async (req,res) => {
    try {
        const {userId , formattedDate} = req.params;

        const userEvents = await agendaModel.find({
            $and: [
                { colaboratives: userId },
                {
                    $expr: {
                        $eq: [
                            {
                                $dateToString: {
                                    date: '$startDate',
                                    format: '%Y-%m-%d',
                                },
                            },
                            formattedDate,
                        ],
                    },
                },
            ],
        });
        
        res.status(StatusCodes.OK).json(userEvents);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: 'Internal Server Error' ,
            error,
        });
    }
}