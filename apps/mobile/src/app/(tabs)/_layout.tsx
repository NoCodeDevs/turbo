import { Tabs, router } from "expo-router";
import { cssInterop } from "nativewind";

import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { Header } from "~/components/common/layout/header";
import { pathsConfig } from "~/config/paths";

const TabBarLabel = ({
  children,
  focused,
}: {
  children: string;
  focused: boolean;
}) => {
  return (
    <Text
      className={cn("text-xs text-muted-foreground", focused && "text-primary")}
    >
      {children}
    </Text>
  );
};

const TabContainer = ({
  tabBarClassName,
  ...props
}: React.ComponentProps<typeof Tabs> & {
  tabBarClassName:
    | {
        backgroundColor: string;
      }
    | string;
}) => {
  return (
    <Tabs
      {...props}
      screenOptions={({ route, navigation }) => ({
        tabBarStyle: {
          backgroundColor:
            typeof tabBarClassName === "string"
              ? tabBarClassName
              : tabBarClassName.backgroundColor,
          paddingTop: 6,
          borderTopWidth: 0,
        },
        ...(typeof props.screenOptions === "function"
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            props.screenOptions({ route, navigation })
          : props.screenOptions),
      })}
    />
  );
};

cssInterop(TabContainer, {
  tabBarClassName: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "tabBarClassName",
    },
  },
});

export default function DashboardLayout() {
  return (
    <TabContainer
      screenOptions={({ route }) => ({
        header: () => (
          <Header
            title={route.name.slice(0, 1).toUpperCase() + route.name.slice(1)}
          />
        ),
      })}
      tabBarClassName="bg-muted"
    >
      <Tabs.Screen
        name="home"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.navigate(pathsConfig.index);
          },
        })}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Icons.House
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />

      <Tabs.Screen
        name="auth"
        options={{
          headerShown: false,
          title: "Auth",
          tabBarIcon: ({ focused }) => (
            <Icons.KeyRound
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ focused }) => (
            <Icons.Newspaper
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: "Billing",
          tabBarIcon: ({ focused }) => (
            <Icons.Wallet
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Icons.Settings
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
    </TabContainer>
  );
}
