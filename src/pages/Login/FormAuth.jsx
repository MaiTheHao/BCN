import Loading from '../../components/Loading/Loading';
import useLoginContext from '../../contexts/Login/useLoginContext';
import FormContent from './FormContent';
import FormInputs from './FormInput';
import { faAt, faLock, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

function FormAuth() {
	const { crrPage, changePage, handleInputChange, handleFormSubmit, errors, inputValue, isFetchAuth } = useLoginContext();

	const signupInputs = [
		{
			icon: faShieldHalved,
			type: "password",
			name: "checkpassword",
			placeholder: "Xác nhận mật khẩu",
			error: errors.checkpassword,
		},
	];

	const baseInputs = [
		{
			icon: faAt,
			type: "text",
			name: "email",
			placeholder: "Email",
			error: errors.email,
		},
		{
			icon: faLock,
			type: "password",
			name: "password",
			placeholder: "Mật khẩu",
			error: errors.password,
		},
	];


	return (
		<>
			{isFetchAuth ? (
				<Loading />
			) : (
				<FormContent crrPage={crrPage} changePage={changePage} handleFormSubmit={handleFormSubmit}>
					<FormInputs
						baseInputs={baseInputs}
						signupInputs={signupInputs}
						crrPage={crrPage}
						handleInputChange={handleInputChange}
						inputValue={inputValue}
						errors={errors}
					/>
				</FormContent>
			)}
		</>
	);
}

export default FormAuth;