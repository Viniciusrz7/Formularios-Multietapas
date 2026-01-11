import { z } from "zod";
import React from "react";
export const personalInfoSchema = z.object({
    firstName: z.string().min(2, "O primeiro nome deve ter pelo menos 2 caracteres"),
    lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Endereço de email inválido"),
    phone: z.string().min(10, "O número de telefone deve ter pelo menos 10 dígitos"),
});

export const professionalInfoSchema = z.object({
    company: z.string().min(2, "O nome da empresa deve ter pelo menos 2 caracteres"),
    position: z.string().min(2, "O cargo deve ter pelo menos 2 caracteres"),
    experience: z.enum(["Junior", "Mid-level", "Senior"], "Selecione um nível de experiência válido"),
    industry: z.string().min(2, "A indústria deve ter pelo menos 2 caracteres"),
});

export const billingInfoSchema = z.object({
    cardNumber: z.string().min(16, "O número do cartão deve ter pelo menos 16 dígitos")
    .max(16, "O número do cartão deve ter no máximo 16 dígitos"),
    cardHolder: z.string().min(2, "O nome do titular deve ter pelo menos 2 caracteres"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "A data de validade deve estar no formato MM/AA"),
    cvv: z.string().min(3, "O CVV deve ter pelo menos 3 dígitos").max(4, "O CVV deve ter no máximo 4 dígitos"),
});


export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfo = z.infer<typeof professionalInfoSchema>;
export type BillingInfo = z.infer<typeof billingInfoSchema>;


export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;

export type AllFormFields = PersonalInfo & ProfessionalInfo & BillingInfo;

export interface Step {
    id: string;
    name: string;
    icon: React.ComponentType<{className?: string}>;
}