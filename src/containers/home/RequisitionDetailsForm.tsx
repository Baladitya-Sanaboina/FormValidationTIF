import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{ onNextTab: () => void }> = ({
  onNextTab,
}) => {
  const { state, setState } = useData()!;

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      gender: state.requisitionDetails.gender,
      noOfOpenings: state.requisitionDetails.noOfOpenings,
      requisitionTitle: state.requisitionDetails.requisitionTitle,
      urgency: state.requisitionDetails.urgency,
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setState({
        ...state,
        requisitionDetails: {
          gender: values.gender,
          noOfOpenings: values.noOfOpenings,
          requisitionTitle: values.requisitionTitle,
          urgency: values.urgency,
        },
      });
      onNextTab();
    },
  });

  const handleBlurWithUpdate = (e: React.FocusEvent<any>) => {
    handleBlur(e);
    setState({
      ...state,
      requisitionDetails: {
        ...state.requisitionDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSelectChange = (field: string, value: any) => {
    setFieldValue(field, value);
    setState({
      ...state,
      requisitionDetails: {
        ...state.requisitionDetails,
        [field]: value,
      },
    });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e: any) => {
            handleChange(e);
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                requisitionTitle: e.target.value,
              },
            });
          }}
          onBlur={handleBlurWithUpdate}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e: any) => {
            handleChange(e);
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                noOfOpenings: e.target.value,
              },
            });
          }}
          onBlur={handleBlurWithUpdate}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(value: any) => {
            handleSelectChange("gender", value);
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                gender: value,
              },
            });
          }}
          onBlur={() => setFieldTouched("gender")}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(value: any) => {
            handleSelectChange("urgency", value);
            setState({
              ...state,
              requisitionDetails: {
                ...state.requisitionDetails,
                urgency: value,
              },
            });
          }}
          onBlur={() => setFieldTouched("urgency")}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
