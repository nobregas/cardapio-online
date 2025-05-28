const SignIn = () => {
  return (
    <div className="auth-bg">
      <div
        className="
          bg-white 
          rounded-[16px] 
          shadow-[0_20px_60px_rgba(0,0,0,0.3)] 
          p-0 
          w-full 
          max-w-[900px] 
          grid 
          grid-cols-2 
          min-h-[500px] 
          relative 
          z-[2] 
          overflow-hidden   
        "
      >
        {/* LEFT SIDE - BRANDING */}
        <div
          className="
                relative 
                flex 
                flex-col 
                justify-center 
                items-center 
                p-2.5 
                text-white 
                bg-gradient-to-br 
                from-[var(--primary)] 
                to-[var(--primary-dark)] 
                login-left
            "
        >
          <div className="flex flex-col items-center z-[1]">
            <div
              className="
                w-[80px] 
                h-[80px] 
                bg-white/20 
                rounded-full 
                flex 
                items-center 
                justify-center 
                mb-5 
                backdrop-blur 
                border 
                border-white/30
                "
            >
              <i className="fas fa-shop text-white text-[36px]"></i>
            </div>
            <h1 className="text-[28px] font-bold mb-2.5 text-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
              Cardápio Online
            </h1>
            <p className="text-center text-[16px] opacity-[0.9] leading-[1.5]">
              Sistema de gerenciamento completo para seu restaurante. Controle
              pedidos, cardápios e muito mais.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN */}
        <div></div>
      </div>
    </div>
  );
};

export default SignIn;
