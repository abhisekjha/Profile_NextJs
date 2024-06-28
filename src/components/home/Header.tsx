import NavMenu from "@/components/home/NavMenu";
import NavSearch from "@/components/home/NavSearch";
import AccountNav from "@/components/home/AccountNav";

export default function Header() {

    return (
        <header className="sticky top-0 flex max-w h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <NavMenu/>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <NavSearch/>
                <AccountNav />
            </div>
        </header>
    );
}