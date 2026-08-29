import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../components/dialogs/Modal";
import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import {
  resetSchoolAdminPasswordSchema,
  resetSchoolAdminPasswordDefaultValues,
} from "../schemas/reset-school-admin-password.schema";

const ResetPasswordFormDialog = ({ open, onClose, onValidated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchoolAdminPasswordSchema),
    defaultValues: resetSchoolAdminPasswordDefaultValues,
  });

  const handleClose = () => {
    reset(resetSchoolAdminPasswordDefaultValues);
    onClose();
  };

  const handleValid = (values) => {
    onValidated(values.password);
    reset(resetSchoolAdminPasswordDefaultValues);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Reset Password" size="sm">
      <form
        noValidate
        onSubmit={handleSubmit(handleValid)}
        className="space-y-5"
      >
        <Field
          id="newPassword"
          label="New Password"
          required
          hint="At least 8 characters"
          err={errors.password?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="********"
            {...register("password")}
          />
        </Field>

        <Field
          id="confirmNewPassword"
          label="Confirm Password"
          required
          err={errors.confirmPassword?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="*******"
            {...register("confirmPassword")}
          />
        </Field>

        <div className="flex justify-end gap-3 pt-2">
          <Btn type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Btn>
          <Btn type="submit">Continue</Btn>
        </div>
      </form>
    </Modal>
  );
};

export default ResetPasswordFormDialog;
