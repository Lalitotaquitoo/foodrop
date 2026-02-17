# ✅ Refactorización: Estado Único para Modales

## Problema Resuelto
Los modales se superponían cuando hacías clic en diferentes tabs (Cuenta → Pedidos, Cuenta → Trabajar, etc.).

## Solución Implementada: Variable de Estado Única

### Antes ❌
```tsx
// Tres variables booleanas separadas
const [showOrdersModal, setShowOrdersModal] = useState(false);
const [showSearchModal, setShowSearchModal] = useState(false);
const [showAccountModal, setShowAccountModal] = useState(false);

// Problema: Podían estar todas en true simultáneamente
```

### Después ✅  
```tsx
// Una sola variable con tipo específico
type OpenModal = 'orders' | 'account' | null;
const [openModal, setOpenModal] = useState<OpenModal>(null);

// Solo un modal puede tener el valor a la vez
```

## Cómo Funciona

### 1. Al hacer clic en un tab:
```tsx
if (tab === 'orders') {
    setOpenModal('orders'); // Automáticamente cierra otros
}
```

### 2. Renderización condicional:
```tsx
{openModal === 'orders' && (
    <div>Modal de Pedidos</div>
)}

{openModal === 'account' && (
    <div>Modal de Cuenta</div>
)}
```

### 3. Función de cierre única:
```tsx
const closeModal = () => setOpenModal(null);
```

## Ventajas del Enfoque

✅ **Imposible tener múltiples modales abiertos**  
✅ **Código más limpio y mantenible**  
✅ **Menos bugs potenciales**  
✅ **TypeScript garantiza valores válidos**  
✅ **Más fácil agregar nuevos modales**

## Jerarquía Z-Index Final

```
z-[100] - Bottom Navigation
z-[90]  - Modales (Pedidos, Cuenta)
z-50    - CartSidebar, otros modales
```

## Casos de Prueba

### ✅ Cuenta → Pedidos
1. Click en "Cuenta" → Abre modal de Cuenta
2. Click en "Pedidos" → Cierra Cuenta, Abre Pedidos
3. **Sin superposición**

### ✅ Pedidos → Cuenta  
1. Click en "Pedidos" → Abre modal de Pedidos
2. Click en "Cuenta" → Cierra Pedidos, Abre Cuenta
3. **Sin superposición**

### ✅ Modal → Trabajar
1. Click en "Cuenta" → Abre modal
2. Click en "Trabajar" → Cierra modal, navega a /worker
3. **Sin superposición**

### ✅ Modal → Carrito
1. Abre cualquier modal
2. Click en ícono de carrito
3. Modal se cierra automáticamente
4. Solo CartSidebar visible

## Código Mejorado

**Archivo:** [MobileNav.tsx](file:///C:/Users/eduar/.gemini/antigravity/scratch/rappi-clone/components/MobileNav.tsx)

**Cambios clave:**
- Reemplazadas 3 variables `useState<boolean>` por 1 `useState<OpenModal>`
- Función `closeModal()` centralizada
- Validación de tipo con TypeScript
- useEffect para cerrar al abrir carrito

---

¡Problema completamente resuelto! 🎉
