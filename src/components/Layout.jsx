import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="min-h-screen bg-page-bg flex relative">
            <aside className="sticky h-screen w-[100px]"></aside>
            <section className="w-full max-w-inv-max-width mt-0 mr-auto mb-10 ml-auto p-0">
                <Outlet />
            </section>
        </main>
    )
}

export default Layout;