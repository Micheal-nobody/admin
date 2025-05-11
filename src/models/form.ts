//File接口定义，用于与后端交互的文件信息
interface File {
    id: number;
    relatedType: string;
    relatedId: number;
    url: string;
    fileName: string;
    fileData: string | Blob;
    mimeType: string;
    sortOrder: number;
    createTime: string;
}

interface Form {
    id: number;
    name: string;
    clubId: number;
    clubName: string;
    createdTime: string;
    updatedTime: string;
    isDeleted: boolean;
    status: string;
    questions: Question[];
}

interface Question {
    id: number;
    formId: number;
    type: string;
    questionText: string;
    questionAttachments: File[];
    sortOrder: number;
    isRequired: boolean;
    options: Option[];
    isDeleted: boolean;
}

interface Option {
    id: number;
    questionId: number;
    optionText: string;
    optionAttachments: File[];
    sortOrder: number;
    isDeleted: boolean;
}

//导出接口
export { File, Form, Question, Option };