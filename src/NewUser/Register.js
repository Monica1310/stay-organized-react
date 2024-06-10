import './NewUser.css';

function Register() {

    return (
        <>
            <div class="container">
                <h1 class="text-center my-4">Register</h1>
                <form>
                    <div class="form-group text-left">
                        <label for="fullname" style={{}}>Full Name* :</label>
                        <input type="text" id="FullName" class="form-control" required />
                    </div>
                    <div class="form-group text-left">
                        <label for="User Name" >User Name* :</label>
                        <input type="Enter the name user wish to use" id="UserName" class="form-control" required />
                        <ul>
                            <li>Your password must be 6 characters long.</li>
                            <li>Your Username must have both letters and numbers.</li>
                            <li>Username should not have any special characters.</li>
                        </ul>
                    </div>
                    <div class="form-group text-left">
                        <label for="password">Password* :</label>
                        <input type="password" id="password" class="form-control" required />
                        <ul>
                            <li>Your password must be atleast 8 characters long.</li>
                            <li>Your Password must contain atleast one of the below following lists</li>
                            <ol>
                                <li>Letters (a-z)</li>
                                <li>Numbers (0-9)</li>
                                <li>Capital Letters (A-Z)</li>
                                <li>Special Characters (!@#$%^&*()_+=)</li>
                            </ol>
                        </ul>
                    </div>
                    <div class="form-group text-left">
                        <label for="confirm password" >Confirm Password* :</label>
                        <input type="confirm password" id="ConfirmPassword" class="form-control" required />
                    </div>
                    <button type="submit" class="btn btn-primary" id="userForm">Register</button>
                </form>
            </div>
            <div id="message"></div>
        </>
    )
}



export default Register;