import { billingInfoSchema, personalInfoSchema, professionalInfoSchema, type Step, type StepFormData } from "@/types"
import { Briefcase, CreditCard, User } from "lucide-react"
import { useState } from "react";
const stepSchemas = [
    personalInfoSchema,
    professionalInfoSchema,
    billingInfoSchema
]

export  const steps:Step[] = [{id: "personal",name: "Informações Pessoais",icon: User},
{id: "professional",name: "Informações Profissionais",icon: Briefcase},
{id: "billing",name: "Informações de Pagamento",icon: CreditCard}
]

export function useMultiStepForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<StepFormData>>({});
    const [isSubmitted,setIsSubmitted] = useState(false);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    const getCurrentStepSchema = () => stepSchemas[currentStep];
    

    const goToNextStep = () => {
        if (!isLastStep) {
            setCurrentStep((prev) => prev + 1);
        }
    }

    const goToPreviousStep = () => {
        if (!isFirstStep) {
            setCurrentStep((prev) => prev - 1);
        }
    }
    
    const updateFormData = (newData: Partial<StepFormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...newData
        }));
    }

    const submitForm = (data: StepFormData) => {
        console.log("Form Submitted", data);
        setIsSubmitted(true);
    }

    const resetForm = () =>{
        setFormData({});
        setCurrentStep(0);
        setIsSubmitted(false);
    }

    return {
        currentStep,
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

    }
}