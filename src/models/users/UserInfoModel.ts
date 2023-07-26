interface UserInfoModel {
    id: number;
    companyId?: number;
    fullName: string;
    pathName: string;
    email: string;
    address?: string;
    phoneNumber?: string;
    description?: string;
    primaryColor: number;
    coverPhotoUrl?: string;
    profilePhotoUrl?: string;
    companyPhotoUrl?: string;
    accountType: string;
    isDirected: boolean;
    isShowContact: boolean;
    isActive: boolean;
    tokenModel: TokenModel;
    //TODO change any when create linkModel
    links?: Array<any>;
}

interface TokenModel {
    accessToken: string,
    expiration: Date,
}

export default UserInfoModel;