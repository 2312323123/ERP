import { RecruitmentsService } from './recruitments.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
export declare class RecruitmentsController {
    private readonly recruitmentsService;
    constructor(recruitmentsService: RecruitmentsService);
    create(createRecruitmentDto: CreateRecruitmentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRecruitmentDto: UpdateRecruitmentDto): string;
    remove(id: string): string;
}
