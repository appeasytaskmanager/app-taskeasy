"use client";
import React, { JSX, useState } from "react";

type FormState = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const mockExistingEmails = ["admin@example.com", "user@teste.com", "teste@domain.com"];

async function checkEmailExists(email: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 700));
    return mockExistingEmails.includes(email.toLowerCase());
}

export default function RegisterForm(): JSX.Element {
    const [form, setForm] = useState<FormState>({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState | "general", string>>>({});
    const [checkingEmail, setCheckingEmail] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
    const [submitted, setSubmitted] = useState(false);

    function handleChange<K extends keyof FormState>(key: K, value: string) {
        setForm((s) => ({ ...s, [key]: value }));
        setErrors((e) => ({ ...e, [key]: undefined, general: undefined }));
        if (key === "email") {
            setEmailAvailable(null);
        }
    }

    async function validateAll(): Promise<boolean> {
        const newErrors: typeof errors = {};

        // nome
        if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório.";

        // email
        if (!form.email.trim()) {
            newErrors.email = "Email é obrigatório.";
        } else if (!emailRegex.test(form.email.trim())) {
            newErrors.email = "Formato de email inválido.";
        } else {
            // se o regex passar, checar disponibilidade
            setCheckingEmail(true);
            try {
                const exists = await checkEmailExists(form.email.trim());
                setEmailAvailable(!exists);
                if (exists) newErrors.email = "Este email já está cadastrado.";
            } catch {
                newErrors.email = "Erro ao verificar email. Tente novamente.";
            } finally {
                setCheckingEmail(false);
            }
        }

        // senha
        if (!form.senha) {
            newErrors.senha = "Senha é obrigatória.";
        } else if (form.senha.length < 8) {
            newErrors.senha = "A senha deve ter no mínimo 8 caracteres.";
        }

        // confirmarSenha
        if (form.confirmarSenha !== form.senha) {
            newErrors.confirmarSenha = "As senhas não coincidem.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(false);
        const ok = await validateAll();
        if (!ok) return;
        // simulando envio
        try {
            setSubmitted(true);
            // aqui você faria a chamada real ao backend
            await new Promise((r) => setTimeout(r, 800));
            // reset ou redirecionamento
            // reset:
            setForm({ nome: "", email: "", senha: "", confirmarSenha: "" });
            setEmailAvailable(null);
            setErrors({});
            alert("Cadastro realizado com sucesso (simulação).");
        } catch {
            setErrors({ general: "Erro ao realizar cadastro. Tente novamente." });
        } finally {
            setSubmitted(false);
        }
    }

    const senhaTemMaiuscula = /[A-Z]/.test(form.senha);

    const styles: Record<string, React.CSSProperties> = {
        container: { maxWidth: 420, margin: "24px auto", padding: 20, border: "1px solid #e0e0e0", borderRadius: 8, fontFamily: "Arial, sans-serif" },
        field: { display: "flex", flexDirection: "column", marginBottom: 12 },
        label: { marginBottom: 6, fontWeight: 600, fontSize: 14 },
        input: { padding: "8px 10px", fontSize: 14, borderRadius: 4, border: "1px solid #ccc" },
        error: { color: "#c0392b", fontSize: 13, marginTop: 6 },
        hint: { color: "#666", fontSize: 12, marginTop: 6 },
        button: { padding: "10px 14px", background: "#0366d6", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" },
        disabledButton: { opacity: 0.6, cursor: "not-allowed" },
        row: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        smallMuted: { fontSize: 12, color: "#666" },
    };

    return (
        <form onSubmit={handleSubmit} style={styles.container} noValidate>
            <h2>Cadastro</h2>

            <div style={styles.field}>
                <label htmlFor="nome" style={styles.label}>
                    Nome
                </label>
                <input
                    id="nome"
                    name="nome"
                    value={form.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.nome}
                    aria-describedby="nome-error"
                />
                {errors.nome && (
                    <div id="nome-error" role="alert" style={styles.error}>
                        {errors.nome}
                    </div>
                )}
            </div>

            <div style={styles.field}>
                <label htmlFor="email" style={styles.label}>
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => {
                        // validação rápida de formato e checagem quando sair do campo
                        if (form.email.trim() && emailRegex.test(form.email.trim())) {
                            setCheckingEmail(true);
                            checkEmailExists(form.email.trim())
                                .then((exists) => {
                                    setEmailAvailable(!exists);
                                    setErrors((prev) => ({ ...prev, email: exists ? "Este email já está cadastrado." : undefined }));
                                })
                                .catch(() => setErrors((prev) => ({ ...prev, email: "Erro ao verificar email." })))
                                .finally(() => setCheckingEmail(false));
                        }
                    }}
                    style={styles.input}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error email-hint"
                />
                <div style={styles.row}>
                    <div id="email-hint" style={styles.hint}>
                        {checkingEmail ? "Verificando disponibilidade..." : emailAvailable === false ? "Email já cadastrado" : emailAvailable === true ? "Email disponível" : "Informe um email válido"}
                    </div>
                </div>
                {errors.email && (
                    <div id="email-error" role="alert" style={styles.error}>
                        {errors.email}
                    </div>
                )}
            </div>

            <div style={styles.field}>
                <label htmlFor="senha" style={styles.label}>
                    Senha
                </label>
                <input
                    id="senha"
                    name="senha"
                    type="password"
                    value={form.senha}
                    onChange={(e) => handleChange("senha", e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.senha}
                    aria-describedby="senha-error senha-hint"
                />
                <div id="senha-hint" style={styles.hint}>
                    Mínimo 8 caracteres. Recomendado usar letras maiúsculas.
                </div>
                {!senhaTemMaiuscula && form.senha.length >= 8 && (
                    <div style={{ ...styles.hint, color: "#b8860b" }}>Recomendação: inclua ao menos uma letra maiúscula para maior segurança.</div>
                )}
                {errors.senha && (
                    <div id="senha-error" role="alert" style={styles.error}>
                        {errors.senha}
                    </div>
                )}
            </div>

            <div style={styles.field}>
                <label htmlFor="confirmarSenha" style={styles.label}>
                    Confirmar Senha
                </label>
                <input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    value={form.confirmarSenha}
                    onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.confirmarSenha}
                    aria-describedby="confirmarSenha-error"
                />
                {errors.confirmarSenha && (
                    <div id="confirmarSenha-error" role="alert" style={styles.error}>
                        {errors.confirmarSenha}
                    </div>
                )}
            </div>

            {errors.general && (
                <div role="alert" style={styles.error}>
                    {errors.general}
                </div>
            )}

            <div style={{ marginTop: 12 }}>
                <button
                    type="submit"
                    style={{ ...styles.button, ...(checkingEmail || submitted ? styles.disabledButton : {}) }}
                    disabled={checkingEmail || submitted}
                >
                    {submitted ? "Enviando..." : "Cadastrar"}
                </button>
            </div>
        </form>
    );
}