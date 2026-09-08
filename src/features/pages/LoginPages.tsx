import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TerpelLogo } from "../components/TerpelLogo";
import { Input } from "@/components/ui/Input";
import { LoginBanner } from "@/components/layout/LoginBanner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { setLogin } from "@/store/slices/authSlice.slice";

const loginValidation = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }).min(1, "El correo es obligatorio"),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
type LoginFormValues = z.infer<typeof loginValidation>;
export const LoginPages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginValidation),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setAuthError(null);
        await new Promise((r) => setTimeout(r, 1400));

        if (data.email === "admin@terpel.com" && data.password === "terpel2026") {
            dispatch(setLogin({ email: data.email, name: "Administrador Terpel" }));
            navigate(PATHS.DASHBOARD, { replace: true });
        } else {

            setAuthError("Correo o contraseña invalidados. Intente con admin@terpel.com / terpel2026");
        }
    };
    return (
        <div className="min-h-screen flex">
            <LoginBanner />

            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden mb-8">
                        <TerpelLogo />
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-text-primary mb-2">Bienvenido</h1>
                        <p className="text-text-primary text-sm">Inicia sesión para realizar las gestiones necesarias</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        <Input
                            label="Correo electrónico"
                            type="email"
                            placeholder="admin@terpel.com"
                            disabled={isSubmitting}
                            error={!!errors.email}
                            errorMessage={errors.email?.message}
                            {...register("email")}
                        />

                        <Input
                            label="Contraseña"
                            isPassword
                            placeholder="••••••••"
                            disabled={isSubmitting}
                            error={!!errors.password}
                            errorMessage={errors.password?.message}
                            {...register("password")}
                        />

                        <div className="flex  justify-end">
                            <button type="button" className="text-sm font-medium text-brand hover:text-brand-dark transition-colors">
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {authError && (
                            <div className="flex items-start gap-2.5 px-3.5 py-3 bg-[#FFF5F5] border border-error rounded-lg">
                                <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-error">{authError}</p>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all
                               bg-brand hover:bg-brand-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Verificando credenciales
                                </>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-text-tertiary">
                        ¿Necesitas ayuda?{"  "}
                        <button className="text-brand hover:underline font-medium">Contactar soporte</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

