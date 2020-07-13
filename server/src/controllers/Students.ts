import { Request, Response } from 'express';

import Students from 'src/models/Students';

import {error404} from "src/controllers/Errors";

export async function getStudents(req: Request, res: Response): Promise<Students[]> {
    const students =  (await Students.findAll({
        attributes: ['id', 'firstName', 'lastName', 'rating'],
    }));

    return students;
}

export async function getStudentsJson(req: Request, res: Response): Promise<void> {
    const students =  await getStudents(req, res);

    res.send(students);
}

export async function deleteStudent(req: Request, res: Response): Promise<void> {
    const student = await Students.findByPk(Number(req.params.id));
    if (student === null) {
        return error404(req, res);
    }

    await student.destroy();

    res.sendStatus(200);
}

export async function createStudent(req: Request, res: Response): Promise<void> {
    await Students.create(req.body);

    res.sendStatus(201);
}