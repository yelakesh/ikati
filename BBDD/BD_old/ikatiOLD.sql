-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 20:21:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ikati`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contrasena` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario`, `contrasena`) VALUES
(4, 'Campos', '123'),
(5, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales`
--

CREATE TABLE `animales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animales`
--

INSERT INTO `animales` (`id`, `nombre`) VALUES
(4, 'Conejos y Roedores'),
(2, 'Gato'),
(3, 'Pájaro'),
(1, 'Perro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aviso_stock`
--

CREATE TABLE `aviso_stock` (
  `id_variante` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aviso_stock`
--

INSERT INTO `aviso_stock` (`id_variante`, `email`) VALUES
(123, 'da@da.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carro`
--

CREATE TABLE `carro` (
  `id_usuario` int(11) NOT NULL,
  `id_variante` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carro`
--

INSERT INTO `carro` (`id_usuario`, `id_variante`, `cantidad`) VALUES
(41, 124, 2),
(69, 79, 1),
(69, 108, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` date DEFAULT curdate(),
  `id_cupon` int(11) DEFAULT NULL,
  `importe` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra_producto`
--

CREATE TABLE `compra_producto` (
  `id_compra` int(11) NOT NULL,
  `id_variante` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `descuento` double DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupones`
--

CREATE TABLE `cupones` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `descuento` double DEFAULT NULL,
  `tipo_descuento` enum('porcentaje','fijo') DEFAULT NULL,
  `fecha_expiracion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filtros`
--

CREATE TABLE `filtros` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_filtro` int(11) NOT NULL,
  `valor` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `filtros`
--

INSERT INTO `filtros` (`id`, `id_producto`, `id_filtro`, `valor`) VALUES
(65, 103, 2, 'Pequeño'),
(67, 104, 5, 'Gris'),
(79, 105, 2, 'Grande'),
(80, 105, 5, 'Amarillo'),
(82, 98, 3, 'Salmón'),
(85, 102, 2, 'Grande'),
(87, 99, 2, 'Pequeño'),
(89, 106, 5, 'Negro'),
(90, 106, 4, 'Metal'),
(91, 106, 1, 'Novedad'),
(92, 107, 3, 'Conejo'),
(93, 101, 3, 'Frutas'),
(96, 109, 4, 'Madera'),
(97, 109, 6, 'Ecológico'),
(98, 111, 1, 'Novedad'),
(100, 100, 5, 'Gris'),
(101, 107, 3, 'Vacuno'),
(102, 107, 3, 'Pollo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `nombre` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `id_producto`, `nombre`) VALUES
(113, 103, 'imagenes-1747774979143-424580191.webp'),
(114, 104, 'imagenes-1747776711253-896814027.jpg'),
(115, 104, 'imagenes-1747776711255-570991767.jpg'),
(116, 104, 'imagenes-1747776711256-872283537.jpg'),
(117, 104, 'imagenes-1747776711256-940659731.jpg'),
(118, 105, 'imagenes-1747807367965-638780237.jpg'),
(119, 105, 'imagenes-1747807367967-246556214.jpg'),
(120, 105, 'imagenes-1747807367968-779695911.jpg'),
(124, 98, 'imagenes-1748242896236-603676065.jpg'),
(129, 102, 'imagenes-1748243022974-87668047.jpg'),
(130, 102, 'imagenes-1748243022974-782914739.jpg'),
(135, 99, 'imagenes-1748282603322-50356734.jpg'),
(136, 99, 'imagenes-1748282603323-739304842.jpg'),
(137, 99, 'imagenes-1748282603324-688352347.jpg'),
(138, 99, 'imagenes-1748282603324-120664248.webp'),
(142, 106, 'imagenes-1748423430279-234308381.jpg'),
(143, 106, 'imagenes-1748423430280-937901817.jpg'),
(144, 106, 'imagenes-1748423430280-243844981.jpg'),
(145, 106, 'imagenes-1748423430281-106307248.jpg'),
(146, 106, 'imagenes-1748423430283-653328479.jpg'),
(147, 107, 'imagenes-1748423992628-4061906.jpg'),
(148, 107, 'imagenes-1748423992628-340055101.jpg'),
(149, 108, 'imagenes-1748424427373-477653405.jpg'),
(150, 108, 'imagenes-1748424427373-778214564.jpg'),
(151, 101, 'imagenes-1748450384638-963097369.jpg'),
(154, 109, 'imagenes-1748452967403-939162021.jpg'),
(155, 109, 'imagenes-1748452967404-225232856.jpg'),
(156, 110, 'imagenes-1748463539081-679051207.jpg'),
(157, 110, 'imagenes-1748463539083-994364073.webp'),
(158, 110, 'imagenes-1748463539086-16343157.jpg'),
(159, 110, 'imagenes-1748463539086-538056308.webp'),
(160, 111, 'imagenes-1748465167870-25869792.jpg'),
(164, 100, 'imagenes-1748585127094-620423462.webp'),
(165, 100, 'imagenes-1748585127095-315921725.jpg'),
(166, 100, 'imagenes-1748585127095-746978574.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marca` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marca`, `nombre`, `imagen`) VALUES
(1, 'Seresto', 'Seresto.png'),
(2, 'Frontline', 'Frontline.png'),
(3, 'Acana Classic', 'Acana_Classic.png'),
(4, 'Advance', 'Advance.png'),
(5, 'Dogxtreme', 'Dogxtreme.jpg'),
(6, 'Royal Canin', 'RoyalCanin.png'),
(7, 'Dogzilla', 'Dogzilla.png'),
(8, 'Outech', 'Outech.png'),
(9, 'Vitakraft', 'Vitakraft.png'),
(10, 'Felix', 'Felix.png'),
(11, 'True Origins', 'True_origins.jpeg'),
(12, 'Greenies', 'Greenies.png'),
(13, 'Catshion', ''),
(14, 'Small Life', 'Smalllife.png'),
(15, 'Versele', 'versele.png'),
(16, 'Wild Mouse', 'wildmouse.png'),
(17, 'Kong', 'kong.png'),
(18, 'Caesar', ''),
(19, 'Purina', 'purina.png'),
(20, 'Anibest', ''),
(21, 'Orijen', 'orijen.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  `id_animal` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `id_tipo` int(11) DEFAULT NULL,
  `descuento` decimal(10,2) DEFAULT NULL,
  `valoracion` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `activo`, `id_animal`, `id_marca`, `id_tipo`, `descuento`, `valoracion`) VALUES
(98, 'True Origins Wild Adult Pacific Salmón pienso para perros', '<p>Pienso con prebioticos, sin cereales y sabor a salmón para perros adultos.</p><p>Comida seca rica en salmón para mantener a tu perro adulto saludable</p><p>El <strong>pienso para perros </strong>Pacific Adult ha sido formulado para cubrir todas las necesidades de los perros adultos y contribuir a su óptimo desarrollo para que crezcan sanos y fuertes.<br>Alimento completo para perros adultos, rico en salmón, un pescado que cuenta con cantidad de propiedades beneficiosas para el organismo. Es una fuente excepcional de proteínas y un aporte de ácidos grasos Omega 3 y Omega 6, que ayudan a reducir los niveles de colesterol y al fortalecimiento de huesos y articulaciones. El consumo de alimentos ricos en Omega 3, como el salmón, ayudan al fortalecimiento del sistema inmunológico y favorecen el mantenimiento de la piel y el pelo sanos.<br>La fruta y verdura son una excelente fuente de minerales y vitaminas, actuando como antioxidantes naturales y ayudando a conservar el sistema inmunitario de tu perro en pleno funcionamiento.</p><p>•&nbsp;&nbsp; &nbsp;La combinación de<strong> fuentes naturales de proteínas</strong> y favorece una alta digestibilidad.<br>•&nbsp;&nbsp; &nbsp;<strong>Prebioticos</strong>: Estimulación de la microflora intestinal.&nbsp;<br>•&nbsp;&nbsp; &nbsp;<strong>Cáscaras de crustáceos </strong>y extracto de cartílago: Ayudan a mantener fuertes los huesos, las articulaciones y los tendones y favorecen a la movilidad.<br>•&nbsp;&nbsp;&nbsp;<strong> Garbanzos</strong>: Fuente natural de proteínas y minerales, como sodio, magnesio, hierro, calcio, los cuales, son necesarios para fortalecer los huesos.<br>•&nbsp;&nbsp; &nbsp;<strong>Omega 3: </strong>Incluye aceite de salmón, rico en omega 3, para el cuidado de la piel y el pelaje.</p><p><strong>Composición</strong><i><strong>:&nbsp;</strong></i>Salmón deshidratado (25 %), pescado blanco deshidratado (18 %), aceite de salmón (12 %), salmón fresco (10 %), patatas (10 %), guisantes (10 %), proteína de salmón hidrolizada (3 %), pulpa de manzana deshidratada (3%), calabaza (3%), huevos hidrolizados (2%), zanahorias (1%), linaza (1%), garbanzos (1%), cáscaras de crustáceos hidrolizados (fuente de glucosamina, 0,026%) , extracto de cartílago (fuente de condroitina, 0,016%), levadura de cerveza (fuente de manano-oligosacáridos, 0,015%), raíz de achicoria seca (fuente de fructo-oligosacáridos, 0,01%), yucca schidigera (0,01%) , algas secas (0,01%), romero seco (0,01%)</p>', 1, 1, 11, 5, 0.00, 3.5),
(99, 'Greenies Teenie Snacks Dentales Naturales para perros pequeños', '<p>Snacks para perros de razas pequeñas de 2 a 7kg, elaborado para lograr una salud dental completa de tu mascota.</p><p>Deliciosos snacks dentales para perros</p><p>Greenies actúa eficazmente en cuatro frentes clave para la higiene oral: el sarro, la placa, el mal aliento y la salud de las encías. El Consejo de la Salud oral veterinaria en USA lo aprueba como el complemento para controlar el sarro y la placa.</p><p><strong>Características:</strong></p><ul><li>Proporciona unas encías sanas.&nbsp;</li><li>Gran palatabilidad, altamente soluble y digestible.&nbsp;</li><li>Reduce el sarro, la placa bacteriana y el mal aliento.&nbsp;</li><li>Creados en base a la forma de la mandíbula y la mordida.&nbsp;</li><li>Fabricado para ajustarse a los hábitos de masticación de los perros.&nbsp;</li></ul>', 1, 1, 12, 7, 0.00, 4.0),
(100, 'Catshion Pole Rascador Gris para gatos', '<p>Rascador gris en varios tamaños de color gris de la marca Catshion.</p><p>Rascador para gatos Catshion Pole</p><p>El Rascador para Gatos Catshion es un accesorio esencial que tu gato amará. Este poste rascador no solo permite a tu felino afilar sus uñas de forma segura, sino que también le brinda diversión y estimula sus instintos naturales. Además, protege tus muebles, cortinas, alfombras y paredes de posibles daños causados por las afiladas garras de tu compañero peludo.</p><p>&nbsp;</p><p>El Rascador Catshion combina un diseño elegante con colores neutros que se integran armoniosamente en tu hogar. Su tamaño compacto garantiza que ocupe muy poco espacio, y su facilidad de limpieza lo convierte en la elección perfecta para mantener tu casa en orden.</p>', 1, 2, 13, 14, 20.00, 3.0),
(101, 'Small Life Barritas de Frutas para conejos', '<p>Golosinas en forma de barras hechas de frutas para tus conejos de la marca Small Life.</p><p>Tentempié para conejos de Small Life</p><p>Este<strong> snack para conejos</strong> de <strong>Small Life</strong> está elaborado con un rico<strong> sabor a frutas</strong> para que tu mascota pueda obtener todos los nutrientes y vitaminas que necesita para mantenerse estable y sano en su vida.</p><p><strong>Tiene forma de barras</strong> para que se le resulte mucho más<strong> fácil de digerir</strong> a la hora de morderlo. Además,<strong> posee unos ganchos</strong> para que puedas colgarlo en la jaula de tu gran amigo para que se le complique la acción de masticarlos.</p>', 1, 4, 14, 7, 50.00, 5.0),
(102, 'Royal Canin Maxi Adult pienso para perros', '<p>Pienso para perros adultos de razas grandes que minimiza los efectos del envejecimiento y mejora la salud articular.</p><p>Pienso para perros de&nbsp;Royal Canin</p><p>Royal Canin Maxi Adult es el alimento indicado para aquellos perros que en edad adulta alcanzan más de 25 kg gracias a su receta, creada especialmente para mantener su organismo en un estado óptimo.</p>', 1, 1, 6, 5, 0.00, 2.7),
(103, 'Versele-Laga Prestige Premium Mix African pienso para loros pequeños', '<p>Alimento para loros pequeños. Se ha elaborado con una mezcla de ingredientes de la mejor calidad.</p><p>El alimento de Versele Laga es perfecto para loros pequeños.<br><br><strong>Características:</strong></p><ul><li>Mezcla de ingredientes desarollada por expertos veterinarios y nutricionistas.</li><li>Alimento de excelente calidad.</li><li>Envasado en atmósfera modificada libre de oxígeno.</li></ul>', 1, 3, 15, 13, 0.00, 4.9),
(104, 'Juguete Wild Mouse con sonido y LED para gatos', '<p>El ratón de juguete Wild Mouse parece tan real que despertará el instinto cazador y las ganas de jugar de tu gato. La <strong>voz aguda de microchip y los ojos rojos iluminados</strong> imitan increíblemente bien el comportamiento y el aspecto de un ratón.</p><p>Este juguete tiene un pelaje artificial que resulta muy agradable para las patitas de tu gato. Además, este ratón salvaje reacciona con sonido y luz LED a los movimientos, por lo que entretiene y sorprende siempre a tu gato.</p><p>Gracias a su aspecto natural y al sonido que emite, cada gato se convertirá en un auténtico cazador. Después de jugar, tu gato puede acurrucarse cómodamente con este suave juguete.</p>', 1, 2, 16, 12, 0.00, 4.2),
(105, 'KONG AirDog Squeakair pelotas para perros', '<p>Para perros que no se conforman con una simple pelota de tenis le ofrecemos esta pelota con sonido.</p><p>El material de la pelota es suficientemente robusto como para resistir las mordeduras y, además, no daña la dentadura del perro.</p>', 1, 1, 17, 12, 0.00, 3.9),
(106, 'Jaula Caesar para pájaros', '<p>Preciosa jaula Caesar móvil con estilo antiguo, espacio para vuelo libre, bandeja para recoger excrementos, incluye accesorios. Distancia entre barrotes: 2,6 cm.</p><p>Un hogar espacioso y confortable para tus mascotas. Con esta elegante jaula ofrecerás a tu pájaro una casa amplia, con ruedas y con una protección especial para impedir que los excrementos caigan fuera.<br>La pajarera, de planta rectangular, tiene unas dimensiones de 101 x 61 x 121 cm (L x An x Al) sin la protección y la base con ruedas. Con el arco que forma el techo de la jaula altura es de 178 cm. La jaula te ofrece un sinfín de posibilidades de diseño interior, ya que tiene unas grandes dimensiones. Así podrás ajustarla a las necesidades de tu pájaro para que se encuentre lo más confortable posible.</p><p>En la jaula encontrarás dos barras para posarse y/o dormir. Las rejillas de la parte frontal y trasera son verticales y poseen un espaciado de malla de aproximadamente 2,1 cm, en los laterales posee además rejillas horizontales que forman un espaciado reticular de alrededor de 2,6 cm.</p>', 1, 3, 18, 10, 30.00, 4.5),
(107, 'Purina Gourmet Perle Finas Láminas en sobres 8 x 85 g - Pack mixto', '<p>Comida húmeda para pequeños sibaritas a base de exquisitos menús gourmet en diferentes y sabrosas variedades. Envase con 4 sabores ideal para mimar el paladar de tu gato.<br><br>Los gatos son animales muy exigentes con la comida y necesitan variedad en su menú diario. Con Purina Gourmet Perle a base de ingredientes seleccionados y finas recetas despertarás los sentidos de tu mascota de una manera única.</p><p>Descubre las variedades de Gourmet Perle Finas Láminas de pescado y carne en delicadas salsas, que mimarán el paladar de los gatos más exigentes aportándoles una vivencia de sabores irresistibles.<br><br><strong>El pack mixto Finas Láminas en Salsa contiene las siguientes variedades:</strong></p><ul><li>2 x con pollo</li><li>2 x con salmón</li><li>2 x con conejo</li><li>2 x con vacuno</li></ul>', 1, 2, 19, 6, 0.00, 4.9),
(108, 'Versele-Laga Cuni Adult Complete para conejos', '<p>Comida para conejos de Versele-Laga. Extruidos de fibras largas sin moler. Alto contenido en fibras y bajo contenido en almidón. <strong>Sin grano de cereal.</strong></p><p>&nbsp;</p><p>Esta comida con extruidos de fibras largas sin moler, está especialmente adaptada a las necesidades de los conejos. Los productos extruidos permiten una dieta sana y equilibrada, ya que al contener cada croqueta la misma mezcla de ingredientes, tu mascota no seleccionará solamente los que le gustan, dejando de lado los que contienen nutrientes esenciales. Además están elaboradas conforme a las necesidades nutricionales de los conejos, ya que no se incluyen granos. El tratamiento especial extruido hace que las croquetas sean más fáciles de digerir y tienen una gran aceptabilidad. Las fibras son retenidas más tiempo para garantizar una digestión saludable y proporcionar el cuidado dental necesario.</p>', 1, 4, 15, 13, 0.00, 4.0),
(109, 'Anibest Pellets de Madera Natural', '<p>Lecho muy absorbente para animales pequeños, granulado de madera natural prensada, absorbe los olores, bajo polvo y gérmenes, respetuoso con el medio ambiente y con certificado PEFC, de Alemania</p><p>&nbsp;</p><p>Los pellets de madera natural de Anibest son un producto natural especialmente sostenible y puro, con impresionantes propiedades funcionales como lecho para animales pequeños. Los pellets consisten en<strong> virutas de madera prensadas y no tratadas</strong>. La estructura celular única de la celulosa, así como la densidad óptima de los pellets, garantizan una unión rápida y fiable de líquidos y olores.<br><br>Debido a la absorción de líquidos, los gránulos forman grumos sólidos que pueden retirarse fácilmente del lecho para garantizar un llenado higiénico en todo momento. Gracias al valor de pH naturalmente bajo y a las esencias especiales de la madera, el lecho para animales pequeños también permanece<strong> prácticamente libre de gérmenes</strong>. La materia prima de los Pellets de Madera Natural Anibest de bajo contenido en polvo con certificación PEFC se obtiene <strong>de una gestión forestal sostenible</strong>.</p>', 1, 4, 20, 9, 0.00, 2.1),
(110, 'Frontline Tri-Act Pipetas Antiparasitarias para perros', '<p>Las pipetas Frontline Tri-Act protegen a los perros de diversas razas y tamaños contra pulgas, garrapatas, mosquitos y más, durante hasta un mes. Apta para cachorros desde las 8 semanas, es ideal para su uso durante la lactancia o gestación.</p><p>&nbsp;</p><p>Las <strong>pipetas Frontline Tri-Ac</strong>t ofrecen un eficaz <strong>tratamiento </strong>y <strong>prevención </strong>de <strong>infestaciones parasitarias </strong>en <strong>perros</strong>, proporcionando protección integral contra <strong>pulgas</strong>, <strong>garrapatas</strong>, <strong>moscas picadoras </strong>y <strong>mosquitos</strong>. Este producto se adapta a perros de diversas razas y tamaños, desde los<strong> 2 hasta los 60 kg</strong>, asegurando una cobertura amplia y efectiva.</p><p>De uso <strong>mensual</strong>, Frontline Tri-Act no solo elimina pulgas y garrapatas, sino que también tiene un potente<strong> efecto repelente</strong> contra el <strong>mosquito transmisor de la leishmaniosis</strong>, así como contra <strong>flebotomos </strong>y <strong>moscas </strong>de los <strong>establos</strong>. Es seguro para su utilización en <strong>cachorros mayores de 8 semanas </strong>y con un peso superior a <strong>2 kg,</strong> además de ser apto para hembras en periodo de <strong>lactancia </strong>o <strong>gestación</strong>.</p>', 1, 1, 2, 4, 5.00, 4.7),
(111, 'Orijen Original pienso para gatos y gatitos', '<p>Pienso natural para gatos de todas las edades, sin cereales, con un gran aporte de proteínas y elaborado con ingredientes frescos de primera calidad.</p><p>Pienso para gatos Orijen Cat &amp; Kitten</p><p>El <strong>alimento para gatos Orijen Cat &amp; Kitten</strong> es un pienso con pollo para gatos y gatitos. Está producido en Canadá con ingredientes de origen natural.&nbsp;</p><p>Incluye un <strong>extra de hígado en su formato liofilizado</strong>, uno de los<strong> ingredientes favoritos de los gatos</strong> que hará que conviertan Orijen en su alimento favorito.</p><p>La receta del pienso para gatos Orijen Cat &amp; Kitten incluye <strong>carne fresca o cruda en 2/3 de la receta</strong>, que añade los 10 ingredientes principales a la correcta nutrición de nuestro gato. El tercio restante se añade en forma de <strong>carne y pescado deshidratado a 90º</strong> y que incluye una fuente concentrada de proteína nutritiva.</p>', 1, 2, 21, 5, 0.00, 4.2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `web` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `id_tipo`, `latitud`, `longitud`, `direccion`, `web`) VALUES
(1, 'Hospital veterinario Retiro', 1, 40.42178441, -3.67966495, 'Av. de Menéndez Pelayo, 9', 'https://hospitalveterinarioretiro.com/'),
(2, 'WagWag', 3, 40.45116945, -3.67756645, 'Calle del Dr. Marco Corera', 'https://www.wagwag.es/'),
(3, 'EncantaDogs', 2, 40.50571260, -3.69057079, 'Pl. Tres Olivos, 2, local posterior', 'http://www.encantadogs.es/'),
(4, 'CityDog Madrid', 3, 40.62489868, -3.69443582, 'Rda. de Valdecarrizo, 5', 'https://citydogmadrid.com/'),
(5, 'Canhotel residencia canina', 3, 40.50578571, -3.65282973, 'Cam. Arroyo de Valdebebas, 13', 'https://www.canhotel.es/'),
(6, 'Medivet 24H Delicias', 1, 40.40815796, -3.69007371, 'Calle de las Delicias, 35', 'https://www.medivetgroup.com/es-es/'),
(7, 'Villamascota Hotel', 3, 40.30558388, -3.69231571, 'Autovía del Sur, 13, km 14', 'https://www.villamascota.es/'),
(8, 'DogMadrid', 3, 40.43970877, -3.81590579, 'C. Campomanes, 53', 'https://www.dogmadrid.es/'),
(9, 'Residencia Canina Malilupus', 3, 40.37722927, -3.81762240, 'Km 10,700 A-5 dirección', 'https://www.malilupus.com/'),
(10, 'La Petucasa', 3, 40.50693643, -3.66946409, 'C. Quintanapalla, 5', 'https://www.lapetucasa.com/'),
(11, 'Centro Canino Gufy', 3, 40.50463322, -3.73097421, 'Carretera Fuencarral-El Pardo, Km. 3,5', 'https://www.centrocaninogufy.com/'),
(12, 'Centro Canino Vallecan', 3, 40.50667059, -3.72029122, 'Carr. de El Pardo a Fuencarral, Km. 2, 200', 'https://www.vallecan.es/'),
(13, 'Residencia Canina Solycan', 3, 40.57388514, -3.58856074, 'Salida 20 A-1, Km 22.300', 'https://residenciacaninamadridsolycan.com/'),
(14, 'Cans College', 3, 40.58183500, -3.58048621, 'C. del Abedul', 'https://canscollege.com/'),
(15, 'Perro Suertudo', 2, 40.51927544, -3.65645757, ' CC Moraleja Green Edificio Norte, Av. de Europa, 13', 'https://perrosuertudo.es/'),
(16, 'Amor Perruno', 2, 40.48395432, -3.72897796, 'C. de Ramón Gómez de la Serna, 81', 'https://www.amorperruno.es/'),
(17, 'RíoPets', 2, 40.38185293, -3.69524439, ' C. Añafil, 3', 'https://riopets.es/'),
(18, 'Gentlecan - Perros estilosos', 2, 40.41965832, -3.67896058, ' C. de Menorca, 1', 'https://gentlecan.es/'),
(19, 'Medivet Ginzo de Limia', 1, 40.47819253, -3.70418346, 'C. de Ginzo de Limia, 33', 'https://www.medivetgroup.com/es-es/'),
(20, 'Medivet Puerta de Toledo', 1, 40.40802841, -3.71293983, ' Gran Vía de San Francisco, 9', 'https://www.medivetgroup.com/es-es/'),
(21, 'Medivet Madrid', 1, 40.43543130, -3.67311860, 'C. de Alonso Heredia, 11', 'https://www.medivetgroup.com/es-es/'),
(22, 'Medivet Sur Vallecas', 1, 40.38142227, -3.65104400, 'Av. de Pablo Neruda, 69', 'https://www.medivetgroup.com/es-es/'),
(23, 'Medivet La Estrella', 1, 40.41086089, -3.66832320, 'C. de la Cruz del Sur, 7', 'https://www.medivetgroup.com/es-es/'),
(25, 'Barbudogs', 2, 40.49064266, -3.64978006, 'C. del Alcalde Redondo Aceña', 'https://www.barbudogs.es/'),
(26, 'Washcotas', 2, 40.51948086, -3.65347350, 'Calle Cuestablanca, 2', 'https://booksy.com/es-es/'),
(27, 'Happy Doggies', 2, 40.43465241, -3.70846901, 'C. de Vallehermoso, 40', 'https://happydoggies.es/'),
(28, 'Medivet 24H Los Sauces', 1, 40.43401424, -3.69857200, 'Calle de Sta Engracia, 63', 'https://www.medivetgroup.com/es-es/'),
(29, 'Quevedog', 1, 40.43514550, -3.70766081, 'C. de Fernández de los Ríos, 32', 'http://www.quevedog.es/'),
(30, 'Vive Pets', 3, 40.55525655, -3.61088546, 'Av. del Camino de lo Cortao, 37', 'https://vivepetresort.com/reservas/'),
(31, 'Medivet 24H La Vaguada', 1, 40.47236294, -3.72806156, 'Calle del Dr. Juan José López Ibor, 30', 'https://www.medivetgroup.com/es-es/'),
(32, 'Clínica Veterinaria Caramuel', 1, 40.41017159, -3.72795360, 'C. de Caramuel, 36', 'https://veterinarios-madrid.es/'),
(33, 'ANIMALIA', 1, 40.42517034, -3.65752860, 'C. de Ricardo Ortiz, 51', 'https://veterinarios-madrid.es/'),
(34, 'Centro Veterinario Alcalá Norte', 1, 40.43675464, -3.63818810, 'C. Alcalá, 414', 'https://veterinarios-madrid.es/'),
(35, 'Clínica Veterinaria Parque Berlín', 1, 40.45101934, -3.67695623, 'Calle del Príncipe de Vergara, 210', 'https://veterinarios-madrid.es/'),
(36, ' Mundo Mascota', 1, 40.43351527, -3.64786860, 'C. Alcalá, 339', 'https://veterinarios-madrid.es/');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_filtro`
--

CREATE TABLE `tipos_filtro` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_filtro`
--

INSERT INTO `tipos_filtro` (`id`, `nombre`) VALUES
(1, 'Novedades'),
(2, 'Tamaño de la mascota'),
(3, 'Sabores'),
(4, 'Material'),
(5, 'Color'),
(6, 'Ecológico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_variacion`
--

CREATE TABLE `tipos_variacion` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_variacion`
--

INSERT INTO `tipos_variacion` (`id`, `tipo`) VALUES
(4, 'Color'),
(5, 'Formato'),
(2, 'Peso'),
(1, 'Talla'),
(3, 'Tamaño');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_producto`
--

CREATE TABLE `tipo_producto` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_producto`
--

INSERT INTO `tipo_producto` (`id`, `tipo`) VALUES
(3, 'Collar Antiparasitario'),
(11, 'Comedero/bebedero'),
(6, 'Comida húmeda'),
(10, 'Jaula'),
(12, 'Juguetes'),
(9, 'Lecho'),
(13, 'Pienso'),
(5, 'Pienso seco'),
(4, 'Pipetas Antiparasitarias'),
(14, 'Rascadores'),
(7, 'Snacks'),
(8, 'Transportín');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tipo_servicio`
--
CREATE TABLE `tipo_servicio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `tipo_servicio`
--
INSERT INTO `tipo_servicio` (`id`, `nombre`) VALUES
(1, 'Veterinaria'),
(2, 'Peluquería'),
(3, 'Guardería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `cp` varchar(10) NOT NULL,
  `direccion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido1`, `apellido2`, `usuario`, `contrasena`, `email`, `telefono`, `cp`, `direccion`) VALUES
(41, 'Juan', 'Lopez', 'Herrero', 'JLH', '123', 'JLH@gmail.com', '666666666', '28050', 'General Margallo'),
(69, 'David', 'Sampalo', '', 'dav', '111', 'da@da.com', '00000000', '28000', 'Calle no sé');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variantes`
--

CREATE TABLE `variantes` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_variacion` int(11) NOT NULL,
  `valor_variacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `variantes`
--

INSERT INTO `variantes` (`id`, `id_producto`, `precio`, `stock`, `id_variacion`, `valor_variacion`) VALUES
(79, 103, 6.49, 20, 5, '1 kg'),
(81, 104, 2.99, 100, 5, '1 unidad'),
(86, 105, 7.49, 50, 5, '2 uds'),
(88, 98, 6.99, 50, 2, '500gr'),
(89, 98, 24.99, 40, 2, '3kg'),
(90, 98, 67.99, 20, 2, '12kg'),
(95, 102, 26.99, 12, 2, '4 kg'),
(96, 102, 62.49, 20, 2, '15 kg'),
(100, 99, 5.69, 40, 5, '11 barritas'),
(101, 99, 9.99, 34, 5, '22 barritas'),
(102, 99, 15.89, 23, 5, '43 barritas'),
(104, 106, 227.99, 0, 3, '123 x 82 x 178 cm (L x An x Al)'),
(105, 107, 5.69, 10, 5, '8 x 85 g'),
(106, 108, 13.49, 5, 2, '1.75 kg'),
(107, 108, 47.49, 5, 2, '8 kg'),
(108, 101, 2.29, 35, 5, '2 barritas'),
(109, 101, 12.64, 54, 5, '12 barritas'),
(112, 109, 5.79, 10, 5, '10 l'),
(113, 109, 15.49, 0, 5, '20 l'),
(114, 110, 22.99, 3, 5, ' 2-5 kg (3 uds)'),
(115, 110, 40.49, 6, 5, ' 2-5 kg (6 uds)'),
(116, 110, 24.99, 1, 5, '5-10 kg (3 uds)'),
(117, 110, 43.99, 3, 5, '5-10 kg (6 uds)'),
(118, 110, 26.49, 0, 5, '10-20 kg (3 uds)'),
(119, 110, 44.99, 8, 5, '10-20 kg (3 uds)'),
(120, 110, 28.49, 7, 5, '20-40 kg (3 uds)'),
(121, 110, 52.49, 5, 5, '20-40 kg (6 uds)'),
(122, 110, 32.49, 4, 5, '40-60 kg (3 uds)'),
(123, 110, 52.49, 0, 5, '40-60 kg (6 uds)'),
(124, 111, 30.89, 2, 2, '1.8kg'),
(125, 111, 52.59, 5, 2, '5.4kg'),
(127, 100, 19.99, 1, 3, 'Mediano');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`usuario`);

--
-- Indices de la tabla `animales`
--
ALTER TABLE `animales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `aviso_stock`
--
ALTER TABLE `aviso_stock`
  ADD PRIMARY KEY (`id_variante`,`email`);

--
-- Indices de la tabla `carro`
--
ALTER TABLE `carro`
  ADD PRIMARY KEY (`id_usuario`,`id_variante`),
  ADD KEY `id_producto` (`id_variante`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cupon` (`id_cupon`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `compra_producto`
--
ALTER TABLE `compra_producto`
  ADD PRIMARY KEY (`id_compra`,`id_variante`),
  ADD KEY `id_producto` (`id_variante`);

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `filtros`
--
ALTER TABLE `filtros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_filtro` (`id_filtro`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marca`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_animal` (`id_animal`,`id_marca`,`id_tipo`),
  ADD KEY `id_tipo` (`id_tipo`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipo_servicio` (`id_tipo`);

--
-- Indices de la tabla `tipos_filtro`
--
ALTER TABLE `tipos_filtro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_variacion`
--
ALTER TABLE `tipos_variacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `tipo_servicio`
--
ALTER TABLE `tipo_servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_variacion` (`id_variacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `animales`
--
ALTER TABLE `animales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `filtros`
--
ALTER TABLE `filtros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `tipos_filtro`
--
ALTER TABLE `tipos_filtro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipos_variacion`
--
ALTER TABLE `tipos_variacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tipo_servicio`
--
ALTER TABLE `tipo_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `variantes`
--
ALTER TABLE `variantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aviso_stock`
--
ALTER TABLE `aviso_stock`
  ADD CONSTRAINT `aviso_stock_ibfk_1` FOREIGN KEY (`id_variante`) REFERENCES `variantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `carro`
--
ALTER TABLE `carro`
  ADD CONSTRAINT `carro_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carro_ibfk_2` FOREIGN KEY (`id_variante`) REFERENCES `variantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_cupon`) REFERENCES `cupones` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `compra_producto`
--
ALTER TABLE `compra_producto`
  ADD CONSTRAINT `compra_producto_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `compra_producto_ibfk_2` FOREIGN KEY (`id_variante`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `filtros`
--
ALTER TABLE `filtros`
  ADD CONSTRAINT `filtros_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE,
  ADD CONSTRAINT `filtros_ibfk_2` FOREIGN KEY (`id_filtro`) REFERENCES `tipos_filtro` (`id`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_animal`) REFERENCES `animales` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_producto` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id_marca`) ON DELETE SET NULL;

--
-- Filtros para la tabla `variantes`
--
ALTER TABLE `variantes`
  ADD CONSTRAINT `variantes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE,
  ADD CONSTRAINT `variantes_ibfk_2` FOREIGN KEY (`id_variacion`) REFERENCES `tipos_variacion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
