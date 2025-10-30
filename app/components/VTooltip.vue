<template>
  <div
    ref="triggerRef"
    :class="['tooltip-trigger', triggerClass]"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @focus="onEnter"
    @blur="onLeave"
    @click="onClick"
  >
    <slot />
  </div>

  <Teleport to="body">
    <div
      v-show="visible"
      ref="tooltipRef"
      class="tooltip bs-tooltip"
      :data-popper-placement="placement"
      role="tooltip"
      @mouseenter="onTooltipEnter"
      @mouseleave="onTooltipLeave"
    >
      <div class="tooltip-inner" v-html="sanitizedTitle"></div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  computed,
} from "vue";
import {
  createPopper,
  Instance as PopperInstance,
  Placement,
  Modifier,
} from "@popperjs/core";

function sanitizeHtml(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;
  template.content.querySelectorAll("script").forEach((n) => n.remove());
  return template.innerHTML;
}

export default defineComponent({
  name: "VTooltip",
  props: {
    title: { type: String, required: true },
    placement: { type: String as () => Placement, default: "top" },
    trigger: {
      type: String as () => "hover" | "click" | "focus" | "manual",
      default: "hover",
    },
    delay: { type: Number, default: 0 },
    html: { type: Boolean, default: false },
    offset: { type: Number, default: 6 },
    triggerClass: { type: String, default: "" },
    showOnMount: { type: Boolean, default: false },
  },
  emits: ["show", "hide"],
  setup(props, { emit }) {
    const triggerRef = ref<HTMLElement | null>(null);
    const tooltipRef = ref<HTMLElement | null>(null);
    let popperInstance: PopperInstance | null = null;
    const visible = ref(props.showOnMount);
    let showTimeout: number | null = null;
    let hideTimeout: number | null = null;

    const sanitizedTitle = computed(() =>
      props.html ? sanitizeHtml(props.title) : escapeHtml(props.title),
    );

    function escapeHtml(str: string) {
      return str;
    }

    function create() {
      if (!triggerRef.value || !tooltipRef.value) return;
      destroy();
      const modifiers: Array<Partial<Modifier<string, any>>> = [
        { name: "offset", options: { offset: [0, props.offset] } },
        { name: "preventOverflow", options: { padding: 8 } },
      ];
      popperInstance = createPopper(triggerRef.value, tooltipRef.value, {
        placement: props.placement,
        modifiers,
      });
    }

    function destroy() {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    }

    function show() {
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      if (visible.value) return;
      if (showTimeout) window.clearTimeout(showTimeout);
      showTimeout = window.setTimeout(() => {
        visible.value = true;
        create();
        emit("show");
      }, props.delay);
    }

    function hide() {
      if (showTimeout) {
        window.clearTimeout(showTimeout);
        showTimeout = null;
      }
      if (!visible.value) return;
      if (hideTimeout) window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(() => {
        visible.value = false;
        destroy();
        emit("hide");
      }, props.delay);
    }

    function toggle() {
      visible.value ? hide() : show();
    }

    function onEnter() {
      if (props.trigger === "hover" || props.trigger === "focus") show();
    }
    function onLeave() {
      if (props.trigger === "hover" || props.trigger === "focus") hide();
    }
    function onClick() {
      if (props.trigger === "click") toggle();
    }
    function onTooltipEnter() {
      if (props.trigger === "hover") show();
    }
    function onTooltipLeave() {
      if (props.trigger === "hover") hide();
    }

    onMounted(() => {
      if (props.showOnMount) create();
      if (triggerRef.value) {
        triggerRef.value.setAttribute(
          "tabindex",
          triggerRef.value.getAttribute("tabindex") || "0",
        );
      }
    });

    onBeforeUnmount(() => {
      destroy();
      if (showTimeout) window.clearTimeout(showTimeout);
      if (hideTimeout) window.clearTimeout(hideTimeout);
    });

    watch(
      () => props.placement,
      () => {
        if (popperInstance)
          popperInstance.setOptions({ placement: props.placement });
      },
    );

    return {
      triggerRef,
      tooltipRef,
      visible,
      onEnter,
      onLeave,
      onClick,
      onTooltipEnter,
      onTooltipLeave,
      sanitizedTitle,
    };
  },
});
</script>

<style scoped>
.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  line-height: 1.2;
  opacity: 0;
  pointer-events: none;
}
.tooltip[data-popper-reference-hidden] {
  visibility: hidden;
  pointer-events: none;
}
.tooltip[style*="display: block"] {
  pointer-events: auto;
}
.tooltip.bs-tooltip {
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;

  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  max-width: 200px;
}
.tooltip .tooltip-inner {
  text-align: left;
}
.tooltip.bs-tooltip[style] {
  opacity: 1;
  pointer-events: auto;
}
.tooltip-trigger {
  display: inline-block;
}
</style>
