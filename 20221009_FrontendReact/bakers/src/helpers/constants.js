export const nameCookieAccessToken = "accessToken";
export const nameCookieExpiresToken = "expiresIn";

export const pathRoutes = {
    login: "/",
    home: "/home",
    userList: "/user",
    userCreate: "/user/create",
    userEdit: "/user/:id",
    productList: "/product",
    productCreate: "/product/create",
    productEdit: "/product/:id",
    categoryList: "/category",
    categoryCreate: "/category/create",
    categoryEdit: "/category/:id",
    unitOfMeasurementList: "/unitOfMeasurment",
    unitOfMeasurementCreate: "/unitOfMeasurement/create",
    unitOfMeasurementEdit: "/unitOfMeasurement/:id",
    movementList: "/movement",
    movementCreate: "/movement/create",
    movementEdit: "/movement/:id",
    roleList: "/role",
    roleCreate: "/role/create",
    roleEdit: "/role/:id",
    orderPadList: "/orderPad",
    orderPadCreate: "/orderPad/create",
    orderPadEdit: "/orderPad/:id",
    orderPadItemEdit: "/orderPadItem/edit/:idOrderPad/:idItem",
    orderPadItemCreate: "/orderPadItem/create/:idOrderPad"
};

export const keyMenus = {
    home: "1",
    category: "2",
    role: "3",
    product: "4",
    unitOfMeasurement: "5",
    user: "6",
    movement: "8",
    exit: "7",
    orderPads: "9"
}