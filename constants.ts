
import { JediPrompt } from './types';

export const PROPERTY_TYPES: string[] = [
    'Piso',
    'Chalet',
    'Ático',
    'Adosado',
    'Local Comercial',
    'Oficina',
    'Terreno',
];

export const TONES: string[] = [
    'Profesional y claro',
    'Lujoso y exclusivo',
    'Cálido y familiar',
    'Moderno y juvenil',
    'Directo y conciso',
];

export const JEDI_PROMPTS: JediPrompt[] = [
    {
        title: "Crear 3 titulares para Instagram",
        prompt: "Actúa como un copywriter inmobiliario experto. Escribe 3 titulares diferentes y llamativos para un anuncio en Instagram sobre un [tipo de propiedad] con [característica principal] en [zona]."
    },
    {
        title: "Escribir email de seguimiento post-visita",
        prompt: "Actúa como un agente inmobiliario proactivo. Escribe un email de seguimiento personalizado para un cliente llamado [nombre del cliente] que acaba de visitar la propiedad en [dirección]. Agradece su tiempo, resume los puntos fuertes de la propiedad y pregunta si tiene alguna duda."
    },
    {
        title: "Guion para vídeo de 1 minuto",
        prompt: "Crea un guion para un vídeo de 1 minuto (formato reel/short) mostrando una propiedad. Estructúralo en 3 partes: 1) Gancho inicial, 2) Recorrido rápido por 3-4 estancias clave, 3) Llamada a la acción clara."
    },
    {
        title: "Responder a la objeción 'el precio es alto'",
        prompt: "Actúa como un negociador experto. Un cliente dice que el precio de la propiedad en [dirección] es demasiado alto. Proporciona 3 argumentos sólidos para justificar el precio, basados en características de la propiedad y la situación del mercado en la zona."
    },
    {
        title: "Generar texto para un folleto",
        prompt: "Escribe un texto conciso y persuasivo para un folleto de una nueva promoción de viviendas. Incluye un titular, una breve introducción sobre el proyecto, 3-5 puntos clave con iconos y una llamada a la acción."
    },
    {
        title: "Campaña de email para captar propietarios",
        prompt: "Diseña una secuencia de 3 emails para una campaña de captación de propietarios en la zona de [barrio/ciudad]. Email 1: Presentación y valoración gratuita. Email 2: Aportar valor (informe de mercado). Email 3: Caso de éxito y llamada a la acción."
    },
    {
        title: "Descripción enfocada en un tipo de cliente",
        prompt: "Escribe una descripción de un anuncio para un [tipo de propiedad] en [dirección], enfocada específicamente a [tipo de cliente, ej. 'familias jóvenes', 'inversores']. Destaca las características que más valorarían."
    },
    {
        title: "Publicación para LinkedIn sobre mercado local",
        prompt: "Redacta una publicación para LinkedIn (3-4 párrafos) posicionándome como experto en el mercado inmobiliario de [ciudad]. Analiza una tendencia reciente y ofrece un consejo práctico."
    },
    {
        title: "Generar preguntas para cualificar a un comprador",
        prompt: "Crea una lista de 5 preguntas clave para cualificar a un lead comprador por teléfono o email, para entender sus necesidades, presupuesto y urgencia."
    },
    {
        title: "Mensaje de WhatsApp para reactivar contacto",
        prompt: "Escribe un mensaje de WhatsApp corto y amigable para reactivar el contacto con un cliente que mostró interés hace meses. El mensaje debe ser casual y aportar valor."
    },
    {
        title: "Crear nombre para promoción de obra nueva",
        prompt: "Genera 5 nombres creativos para una nueva promoción de viviendas en [ciudad], que transmita sensaciones de [concepto 1, ej. modernidad] y [concepto 2, ej. naturaleza]."
    },
    {
        title: "Guion para llamada en frío a un propietario",
        prompt: "Desarrolla un guion breve y efectivo para una llamada en frío a un propietario que intenta vender su casa por su cuenta. El objetivo es conseguir una cita para explicarle mis servicios."
    },
    {
        title: "Generar ideas de contenido para blog",
        prompt: "Dame 10 ideas para artículos de blog para una inmobiliaria en España, que sean útiles para compradores y vendedores y ayuden a posicionar la marca como experta."
    },
    {
        title: "Redactar una bio profesional para portales",
        prompt: "Escribe una biografía profesional de unas 100 palabras para mi perfil en portales inmobiliarios. Debe destacar mi experiencia, mi especialización en [zona] y mi compromiso con los clientes."
    },
    {
        title: "Argumentario de venta para una visita",
        prompt: "Prepara un argumentario de venta para la propiedad en [dirección]. Identifica los 5 puntos fuertes principales y los 2 puntos débiles potenciales, con una propuesta para rebatirlos."
    }
];
