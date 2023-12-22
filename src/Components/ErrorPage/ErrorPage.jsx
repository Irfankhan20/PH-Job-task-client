import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
             <section className='flex flex-col items-center justify-center h-screen p-16  text-gray-900'>
        {/* <img className='w-4/12' src="/src/assets/404 error lost in space-cuate.png" alt="" /> */}
        <img className='pb-3 w-4/12' src="https://i.ibb.co/S3z56fF/20602743-6333685-removebg-preview.png" alt="" />
        <button className='btn text-black bg-[#23e6e6] border-none hover:bg-[#23e6e6]'><Link to="/">Back To Home</Link></button>
    </section>
        </div>
    );
};

export default ErrorPage;