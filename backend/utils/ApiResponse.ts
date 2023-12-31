class ApiResponse {
    statusCode: number;
    message: string;
    data: any;
    success: true

    constructor(statusCode: number, message: string, data: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true
    }
}

export default ApiResponse;