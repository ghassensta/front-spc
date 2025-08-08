
import { motion } from "framer-motion";

function LoadingScreen() {  
    const dotVariants = {  
        jump: {  
            y: -30,  
            transition: {  
                duration: 0.8,  
                repeat: Infinity,  
                repeatType: "mirror",  
                ease: "easeInOut",  
            },  
        },  
    };  

    return (  
        <motion.div  
            className="flex justify-center items-center gap-2"  
            animate="jump"  
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}  
        >  
            <motion.div  
                className="w-5 h-5 rounded-full bg-primary"  
                variants={dotVariants}  
            />  
            <motion.div  
                className="w-5 h-5 rounded-full bg-primary"  
                variants={dotVariants}  
            />  
            <motion.div  
                className="w-5 h-5 rounded-full bg-primary"  
                variants={dotVariants}  
            />  
        </motion.div>  
    );  
}  

export default LoadingScreen;  