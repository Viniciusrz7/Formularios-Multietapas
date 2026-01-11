import { useState } from "react";
import { CardTitle } from "./ui/card";
import FormField from "./form-field";
import type { useForm } from "react-hook-form";
import type { StepFormData } from "@/types";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
interface StepProps {
    register: ReturnType<typeof useForm<StepFormData>>["register"];
    errors: Record<string, { message?: string }>;
    setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

const PersonalInfoStep = ({ register, errors }: StepProps) => {
    return <div className="space-y-4">
        <CardTitle className="text-x1">Informações Pessoais</CardTitle>
        <div className="grid grid-cols-2 gap-4">
            <FormField
                id="firstName"
                label="Primeiro Nome"
                register={register}
                errors={errors}
            />
            <FormField
                id="lastName"
                label="Sobrenome"
                register={register}
                errors={errors}
            />
        </div>
        <FormField
            id="email"
            label="Email"
            register={register}
            errors={errors}
            type="email"
        />
        <FormField
            id="phone"
            label="Numero de Telefone"
            register={register}
            errors={errors}
            type="email"
        />

    </div>

}
const ProfessionalInfoStep = ({ register, errors, setValue }: StepProps) => {
    const [experience, setExperince] = useState("");
    return <div className="space-y-4">
        <CardTitle className="text-x1">Profissional detalhes</CardTitle>
        <FormField
            id="company"
            label="Empresa"
            register={register}
            errors={errors}
        />
        <FormField
            id="position"
            label="Posição"
            register={register}
            errors={errors}
        />

        <div className="space-y-2">
            <Label htmlFor="experience">Nível de Experiência</Label>
            <Select
                onValueChange={(value) => {
                    setValue?.(
                        "experience",
                        value as Extract<
                            StepFormData,
                            { experience: string }
                        >["experience"],
                        { shouldValidate: true }
                    );
                    setExperince(value);
                }}
                value={experience}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione seu nível" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Junior">Junior 0-2 anos</SelectItem>
                    <SelectItem value="Mid-level">Pleno 3-5 anos</SelectItem>
                    <SelectItem value="Senior">Senior 6-10 anos</SelectItem>
                </SelectContent>
            </Select>
            {errors.experience && (
                <p className="text-sm text-destructive">{errors.experience.message}</p>
            )}
        </div>
        <FormField
            id="industry"
            label="Industria"
            register={register}
            errors={errors}
        />

    </div>

}
const BillingInfoStep = ({ register, errors }: StepProps) => {
    return (
        <div className="space-y-4">
            <CardTitle className="text-x1">Informações de Pagamento</CardTitle>
            <FormField
                id="cardNumber"
                label="Número do Cartão"
                register={register}
                errors={errors}
                maxLength={16}
            />
            <FormField
                id="cardHolder"
                label="Nome do Titular"
                register={register}
                errors={errors}
            />

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiryDate">Data de Expiração</Label>
                    <Input 
                        id="expiryDate" 
                        placeholder="MM/AA" 
                        maxLength={5}
                        {...register("expiryDate")}
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            e.target.value = value;
                            register("expiryDate").onChange(e);
                        }}
                    />
                    {errors.expiryDate && (
                        <p className="text-sm text-destructive">{errors.expiryDate?.message}</p>
                    )}
                </div>
                <FormField
                    id="cvv"
                    label="CVV"
                    register={register}
                    errors={errors}
                    maxLength={4}
                />

            </div>
        </div>
    )
}

export { PersonalInfoStep, ProfessionalInfoStep, BillingInfoStep };