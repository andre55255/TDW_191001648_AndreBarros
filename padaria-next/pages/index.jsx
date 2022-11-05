export default function Index() {
    return (
        <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
                <div className="my-5 text-center text-xl-start">
                    <h1 className="display-5 fw-bolder mb-2">
                        Bem vindo,
                    </h1>
                    <p className="lead fw-normal mb-4">
                        Sistema de gestão para padaria, baseado em NodeJS e Next para controle de estoque,
                        pedidos, etc.
                    </p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                        <button
                            className="btn btn-primary btn-lg px-4 me-sm-3"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
            </div>
        </div>
    );
}
