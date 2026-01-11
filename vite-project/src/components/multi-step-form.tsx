import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import type { StepFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ProgressStep from "./progress-steps";
import { BillingInfoStep, PersonalInfoStep, ProfessionalInfoStep } from "./steps";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
const MultiStepForm = () => {
    // Custom Hook
    const { currentStep,
        formData,
        isFirstStep,
        isLastStep,
        isSubmitted,
        steps,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
        getCurrentStepSchema
    } = useMultiStepForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        reset,
    } = useForm<StepFormData>({
        resolver: zodResolver(getCurrentStepSchema()),
        mode: "onChange",
        defaultValues: formData,
    })

    useEffect(() => { reset(formData); }, [currentStep, formData, reset]);

    const onNext = async (data: StepFormData) => {
        // validação manual
        const isValid = await trigger();
        if (!isValid) return;

        const updatedData ={...formData,...data};
        updateFormData(updatedData);

        if(isLastStep){
            try{
                submitForm(updatedData);
            }catch(error){
                console.log("Falha ao submeter o formulário",error);
            }
        }else{
            goToNextStep();
        }
        // Mescla dados da etapa atual com os dados do formulário


    };
    
    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-2xl">
                    <CardContent className="pt-6 text-center space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                        <CardTitle className="text-2xl">Formulário Enviado com Sucesso!</CardTitle>
                        <p className="text-gray-600">Obrigado por preencher o formulário.</p>
                        <Button onClick={resetForm}>Enviar Novo Formulário</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return <div className="min-h-screen flex  items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-2x1">
            <CardHeader>
                <ProgressStep currentStep={currentStep} steps={steps} />
            </CardHeader>
            <CardContent className="space-y-6">
                {currentStep === 0 && <PersonalInfoStep register={register} errors={errors}/>}
                {currentStep === 1 && <ProfessionalInfoStep register={register} errors={errors} setValue={setValue} />}
                {currentStep === 2 && <BillingInfoStep register={register} errors={errors}/>}

                <div className="flex justify-between items-center">
                    <Button type="button"
                        variant="outline"
                        onClick={goToPreviousStep}
                        disabled={isFirstStep}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Voltar
                    </Button>
                    <Button type="button" onClick={handleSubmit(onNext)}>
                        {isLastStep ? "Enviar" : "Continuar"}

                        {!isLastStep && <ChevronLeft className="w-4 h-4 ml-1" />}
                    </Button>
                </div>
            </CardContent>
        </Card>

    </div>;
}

export default MultiStepForm;