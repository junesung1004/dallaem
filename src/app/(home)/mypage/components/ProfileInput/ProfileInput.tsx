import ProfileIcon from '../ProfileIcon/ProfileIcon';

function ProfileInput() {
	return (
		<div>
			<label htmlFor='profile-file' className='cursor-pointer inline-block'>
				<ProfileIcon.EditProfile />
			</label>
			<input type='file' id='profile-file' className='hidden' />
		</div>
	);
}

export default ProfileInput;
