import { useAppContext } from "@/context/AppContext";
import { Shield, Eye } from "lucide-react";

export default function RoleToggle(){
    const {role,setRole} = useAppContext();

    return(
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <button onClick={()=> setRole("admin")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    role === "admin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}>
                    <Shield className="h-3.5 w-3.5"/>
                    Admin
                </button>
                <button onClick={()=> setRole("viewer")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        role === "viewer" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}>
                        <Eye className="h-3.5 w-3.5"/>
                        Viewer
                    </button>
        </div>
    )
}