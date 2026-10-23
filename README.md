# 🏆 Cufa's Cup 2 - Web Oficial del Torneo de FIFA

Aplicación web moderna y responsive para gestionar y seguir en tiempo real el torneo **Cufa's Cup 2** con formato oficial **Champions League (20 equipos)**.

---

## 🌟 Características Principales

1. **🏆 Tabla de Posiciones (Fase Liga - 20 Equipos):**
   - **Puestos 1° al 4° (Dorado):** Clasificación directa a Cuartos de Final.
   - **Puestos 5° al 12° (Cyan):** Clasificación a Playoffs preliminares (16vos/Octavos).
   - **Puestos 13° al 20° (Rojo/Gris):** Eliminados.
   - Estadísticas automáticas: PJ, PG, PE, PP, GF, GC, Diferencia de Gol (+/-), Puntos y Racha de los últimos 5 partidos (`W`, `D`, `L`).

2. **📅 Fixture & Calendario:**
   - Navegación por jornadas (Jornadas 1 a 5).
   - Tarjetas de enfrentamientos con escudos, jugadores y estado (Por jugar, En vivo, Finalizado).

3. **⚔️ Cuadro de Eliminatorias (Playoffs Bracket):**
   - Estructura visual conectada: Playoffs preliminares ➡️ Cuartos de Final ➡️ Semifinales ➡️ Gran Final ➡️ Podio del Campeón 🏆.
   - Botón en panel admin para sincronizar automáticamente los cruces de playoffs según la tabla de posiciones.

4. **🔍 Buscador Rápido de Participantes:**
   - Permite a cualquier jugador escribir su nombre o equipo y encontrar sus partidos y posición al instante.

5. **⚙️ Panel de Administrador Protegido (PIN):**
   - **PIN por defecto:** `1234` (configurable desde el panel).
   - Carga rápida de goles con botones `+` y `-`.
   - Modificación de nombres, jugadores y escudos/emojis de los 20 equipos.
   - Exportación e importación de copias de seguridad en formato `JSON`.
   - Soporte para **Firebase Firestore en vivo** (para que los participantes vean los cambios en tiempo real sin hacer commits).

---

## 🚀 Cómo hostear en GitHub Pages

1. Subí todos los archivos del proyecto a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: lanzar web oficial Cufas Cup 2"
   git push origin main
   ```
2. En GitHub, andá a tu repositorio ➡️ **Settings** ➡️ **Pages**.
3. En **Branch**, seleccioná `main` y la carpeta `/ (root)`, luego hacé clic en **Save**.
4. ¡Listo! Tu página estará disponible públicamente en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

---

## 🔥 Conexión con Firebase Firestore (Opcional - Resultados en Vivo)

Si querés que tus amigos vean los goles y resultados actualizados en vivo sin tener que hacer commits en GitHub:

1. Creá un proyecto gratuito en [Firebase Console](https://console.firebase.google.com/).
2. Creá una base de datos **Firestore Database** en modo prueba (`test mode`).
3. Creá una aplicación web en Firebase y copiá tus credenciales (`apiKey`, `projectId`, etc.).
4. En la web de Cufa's Cup, entrá a **Panel Admin** ➡️ **Configurar Firebase**, pegá las credenciales y hacé clic en **Guardar y Conectar**.
5. ¡A partir de ese momento, cada gol que guardes se sincronizará automáticamente para todos los visitantes!
