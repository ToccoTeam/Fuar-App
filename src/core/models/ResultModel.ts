interface ResultModel<TData> {
    message: string;
    success: boolean;
    data: TData | null;
    status?: number;
}

export default ResultModel;