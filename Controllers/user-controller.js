

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


const Register = async (req, res) => {
    const { firstName, lastName, avatarURL,networkID,email, password, role} = req.body;
    
    
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            firstName, lastName, avatarURL,networkID,email, password, role
        })



        //encrypt password
        const salt = await bcrypt.genSalt(10); //generate salt contains 10
        //save password
        user.password = await bcrypt.hash(password, salt) //use user password and salt to hash password
        //save user in database
        await user.save();
        //payload to ganarate token
        res.status(201).json({ msg: "user created successfully" })
    } catch (error) {

        res.status(500).send('Server error');
        }
}

const NewAdmin = async (req, res) => {
    const { email, password } = req.body;
    const role = "admin";
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        user = new User({
            email, password, role
        })
        //encrypt password
        const salt = await bcrypt.genSalt(10); //generate salt contains 10
        //save password
        user.password = await bcrypt.hash(password, salt) //use user password and salt to hash password
        //save user in database
        await user.save();
        //payload to ganarate token
        res.status(201).json({ msg: "admin created successfully" })
    } catch (error) {
        console.log(err.message)
        res.status(500).send('Server error');

    }
}

const Login = async (req, res) => {
    const  email = req.body.email;
    const password=req.body.password;
    try {
        //find user
        let user = await User.findOne({ email });
        let errorUser=new User(); 
        //if user not found
        if (!user) {
            errorUser.email='invalid email';
          //  return res.status(400).json({ msg: 'invalid email' })
          return res.json(errorUser);
        }
        //if user found , compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        //password doesn't match
        if (!isMatch) {
            errorUser.email="password is wrong";
            //return res.status(400).json({ msg: 'invalid password' })
            return res.json(errorUser);
           
        }

       // const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
       const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET)
       
       console.log("CONNECTEDDD ");

        res.json( user )
        user.isConnected=true;
       await user.save();
    } catch (error) {

        res.status(500).send('Server error' + error);
    }

}
const Logout = async (req, res) => {
    const  email = req.body.email;
    try {
        //find user
        let user = await User.findOne({ email });
       
        user.isConnected= false;
        await user.save();
       console.log("DISCONNECTED ");

       return res.status(200).json({ msg: 'DISCONNECTED' })
    } catch (error) {

        res.status(500).send('Server error' + error);
    }

}
const getAll = async (req, res) => {
    User.find()
        .then(users => {
            res.json({ users })
        })
        .catch(err => {
            console.log(err);
        })
}
const getAvatarUrl = async (req, res) =>{
    const {email} = req.body ;
    try {
        //find user
        let user = await User.findOne({ email }).select('avatarURL');;

        //if user not found
        if (!user) {
            return res.status(400).json({ msg: 'invalid email' })
        }
       const URLavatar = user.avatarURL;

        res.json({  URLavatar })
    } catch (error) {

        res.status(500).send('Server error' + error);
    }

}

const setAvatarUrl = async (req, res) =>{
    const {email, newURLavatar} = req.body ;
    const filter = { email: email };
    const update = { avatarURL: newURLavatar };

    try {
        //find  user  
        let user = await User.findOne({ email });

        //if user not found
        if (!user) {
            return res.status(400).json({ msg: 'invalid email' })
        }
       
        await User.updateOne(filter,update);
        user.avatarURL=newURLavatar;
        await user.save();
        res.json(user)
    } catch (error) {

        res.status(500).send('error');
    }

}

const updateUser = async (req,res)=>{
    const { firstName, lastName, avatarURL,networkID,email, password, role} = req.body;
    try {
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'invalid email' })
    }
    res.json({title :' done',user})
} catch (error) {

    res.status(500).send('Server error' + error);
}

}
                 //user can add friends 
const addFriend = async (req,res)=>{
    const emailUserConnected = req.body.emailUserConnected;
    const emailUserToAdd = req.body.emailuserToAdd;


    try {
        let userContected = await User.findOne({ emailUserConnected });
        let userToAdd = await User.findOne({ emailUserToAdd });

    if(!userContected || !userToAdd)
    {
        return res.status(400).json({ msg: 'invalid email' })
    }
    const filter ={User :userContected};
    const update={$push: {'User.$.friends':userToAdd}};
    await User.updateOne(filter,update);

       
        await userContected.save();
        res.json(userContected);
    } catch (error) {
    
        res.status(500).send('Server error' + error);
    }
 
}
module.exports = {
    Register,
    Login,
    getAll,
    NewAdmin,
    updateUser,
    getAvatarUrl,
    setAvatarUrl,
    addFriend,
    Logout
  

}
