import { ActiveRecruitmentsService } from './active_recruitments.service';
import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';
export declare class ActiveRecruitmentsController {
    private readonly activeRecruitmentsService;
    constructor(activeRecruitmentsService: ActiveRecruitmentsService);
    create(createActiveRecruitmentDto: CreateActiveRecruitmentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateActiveRecruitmentDto: UpdateActiveRecruitmentDto): string;
    remove(id: string): string;
}
