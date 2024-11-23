export class FirebaseErrorTranslator {
    private static readonly errorMessages: Record<string, string> = {
      // Autenticación
      "auth/email-already-in-use": "El correo electrónico ya está en uso.",
      "auth/user-not-found": "No se encontró un usuario con este correo.",
      "auth/wrong-password": "La contraseña es incorrecta.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
      "auth/invalid-email": "El correo electrónico no es válido.",
      "auth/too-many-requests": "Has realizado demasiados intentos. Inténtalo más tarde.",
  
      // Firestore
      "permission-denied": "No tienes permisos para realizar esta acción.",
  
      // Otros
      "unknown": "Ocurrió un error desconocido. Por favor, intenta de nuevo.",
    };
  
    static translate(errorCode: string): string {
      return this.errorMessages[errorCode] || "Ocurrió un error inesperado.";
    }
  }