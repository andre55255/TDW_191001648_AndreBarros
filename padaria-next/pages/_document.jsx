import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "../components/Navbar/Navbar";

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                    crossorigin="anonymous"
                />
                <link href="css/globals.css" rel="stylesheet" />
            </Head>
            <body className="d-flex flex-column h-100">
                <div className="flex-shrink-0">
                    <header>
                      <Navbar />
                    </header>
                    <main className="container-fluid">
                      <Main />
                    </main>
                </div>
                <NextScript />
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
                    crossorigin="anonymous"
                ></script>
            </body>
        </Html>
    );
}
