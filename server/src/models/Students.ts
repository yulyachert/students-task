import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

@Table
class Students extends Model<Students> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    firstName: string;

    @Column({
        type: DataType.STRING
    })
    lastName: string;

    @Column({
        type: DataType.INTEGER
    })
    rating: number;
}

export default Students;