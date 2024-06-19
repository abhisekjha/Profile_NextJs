'use client';

import {
    LogOut,
    Settings,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { clearSession } from "@/lib/webauthn/browser/cookieStorage";

export default function DropdownMenuAccount() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            {/*<DropdownMenuContent className="w-56">*/}
            <DropdownMenuContent>

                <DropdownMenuLabel>Account Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    {/*<span>Log out</span>*/}
                    <button
                        className="ml-2 h-4 w-4"
                        onClick={() => clearSession()}
                    >
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
