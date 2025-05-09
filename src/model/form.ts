
//File接口定义，用于与后端交互的文件信息
interface File { 
    id: string | number;
    fileName: string;
    fileData: string;
    mimeType: string;
    tableType: string;
    createTime: string;
    sortOrder: number;
}

interface Form {
    id: string | number;
    name: string;
    clubId: string | number;
    clubName: string;
    createdTime: string;
    updatedTime: string;
    isDeleted: boolean;
    status: string;
    questions: Question[];
}

interface Question {
    id: string | number;
    formId: string | number;
    type: string;
    questionText: string;
    questionAttachment: File;
    sortOrder: number;
    isRequired: boolean;
    options: Option[];
    isDeleted: boolean;
}

interface Option {
    id: string | number;
    questionId: string | number;
    optionText: string;
    optionAttachment: File;
    sortOrder: number;
    isDeleted: boolean;
}

//导出接口
export { File, Form, Question, Option };