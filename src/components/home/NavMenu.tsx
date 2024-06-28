'use client';
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu, Package2} from "lucide-react";
import { usePathname } from 'next/navigation'

export default function NavMenu() {
    const currPath = usePathname();

    function selected(path: string) {
        return currPath === path
            ? "text-foreground transition-colors"
            : "text-muted-foreground transition-colors hover:text-foreground";
    }

    return (
        <>
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/public"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    {/*<Package2 className="h-6 w-6" />*/}
                    <span className="text-nowrap">Smart Pay</span>
                </Link>
                <Link
                    href="/dashboard"
                    className={selected("/dashboard")}
                >
                    Dashboard
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span>Acme Inc</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className={selected("/dashboard")}
                        >
                            Dashboard
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}